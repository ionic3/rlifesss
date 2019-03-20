import { Component } from '@angular/core';
import { NavController, NavParams,ToastController ,AlertController,Refresher} from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ReffralServerProvider } from '../../providers/reffral-server/reffral-server';
@Component({
  selector: 'page-personal-sales',
  templateUrl: 'personal-sales.html'
})
export class PersonalSalesPage {
	customer_id :any;
	infomation = {};
	historys: string = "dstam";
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
		  		
		  	} 
		})

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
		this.ReffralServer.GetInfomationUser(this.customer_id)
        .subscribe((data) => {
			if (data.status == 'complete')
			{
				this.infomation = data;
			}
        })

			  	
		refresher.complete();
    	
  	}
}
