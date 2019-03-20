import { Component } from '@angular/core';
import { NavController, NavParams,ToastController ,AlertController,Refresher} from 'ionic-angular';
import { WithdrawPage } from '../withdraw/withdraw';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ReffralServerProvider } from '../../providers/reffral-server/reffral-server';
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {
	customer_id :any;
	infomation = {};
	history_commision_truche : any;
	history_commision_nhom : any;
	history_commision_conghuong : any;
	history_commision_thuong : any;

	count_commision_truche = 0;
	count_commision_nhom = 0;
	count_commision_conghuong = 0;
	count_commision_thuong = 0;

	historys: string = "truche";
  constructor(
  	public navCtrl: NavController, 
	public navParams: NavParams,
	
	public storage: Storage,
	public loadingCtrl: LoadingController,
	public toastCtrl: ToastController,
	public alertCtrl: AlertController,
	public ReffralServer: ReffralServerProvider
  	) {

  }

  	ionViewDidLoad() {
  		let loading = this.loadingCtrl.create({
		    content: 'Đang tải dữ liệu... Vui lòng chờ!'
	  	});
  		loading.present();
  		this.storage.get('customer_id')
		.then((customer_id) => {
			if (customer_id) 
			{
				this.customer_id = customer_id;
				this.ReffralServer.GetInfomationUser(this.customer_id)
		        .subscribe((data) => {
		        	loading.dismiss();
					if (data.status == 'complete')
					{
						this.infomation = data;
						
					}
					
		        })

		        this.ReffralServer.GetHisroryCommisionTrucHe(this.customer_id)
		        .subscribe((data) => {
					if (data)
					{
						this.history_commision_truche = data;
						this.count_commision_truche = data.length;
	
					}
		        })

		        this.ReffralServer.GetHisroryCommisionNhom(this.customer_id)
		        .subscribe((data) => {
					if (data)
					{
						this.history_commision_nhom = data;
						this.count_commision_nhom = data.length;
					}
		        })

		        this.ReffralServer.GetHisroryCommisionCongHuong(this.customer_id)
		        .subscribe((data) => {
					if (data)
					{
						this.history_commision_conghuong = data;
						this.count_commision_conghuong = data.length;
					}
		        })

		        this.ReffralServer.GetHisroryCommisionThuong(this.customer_id)
		        .subscribe((data) => {
					if (data)
					{
						this.history_commision_thuong = data;
						this.count_commision_thuong = data.length;
					}
		        })
		  		
		  	} 
		})

	}



	ViewWithdraw(){
		this.navCtrl.push(WithdrawPage);
	}

	Formatnumber(nStr){
	    nStr += '';
	    var x = nStr.split('.');
	    var x1 = x[0];
	    var x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;	
	}


	doRefresh(refresher: Refresher) {
		

			  	
		refresher.complete();
    	
  	}
}
