import { Component } from '@angular/core';
import { NavController, NavParams,ToastController ,AlertController,Refresher} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SystemPage } from '../system/system';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { WalletPage } from '../wallet/wallet';
import { WithdrawPage } from '../withdraw/withdraw';
import { ReffralServerProvider } from '../../providers/reffral-server/reffral-server';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	customer_id :any;
	infomation = {};

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

	CalculationSystem(){
		const confirm = this.alertCtrl.create({
        title: 'Tính hoa hồng nhóm',
        message: 'Bạn có chắc chắn tính hoa hồng nhóm',
        buttons: [
          {
            text: 'Hủy',
            handler: () => {
              
            }
          },
          {
            text: 'Đồng ý',
            handler: () => {
            	let loading = this.loadingCtrl.create({
				    content: 'Đang tải dữ liệu... Vui lòng chờ!'
			  	});
		  		loading.present();
              	this.ReffralServer.CalculationSystemAccount(this.customer_id)
		        .subscribe((data) => {
		        	loading.dismiss();
					if (data.status == 'complete')
					{
						
						let toast = this.toastCtrl.create({
							message: 'Tính hoa hồng thành công!',
							position: 'top',
							duration : 2000,
							cssClass : 'alert_success'
						});
						toast.present();
						
					}
					else
					{
						this.AlertToast(data.message);
					}
					
		        })
            }
          }
        ]
      });
      confirm.present();
	}

	ViewHistory(){
		this.navCtrl.push(WalletPage);
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
	
	ViewPageSystem(){
		this.navCtrl.push(SystemPage);
	}
	doRefresh(refresher: Refresher) { 	

		this.ReffralServer.GetInfomationUser(this.customer_id)
        .subscribe((data) => {
        	refresher.complete();
			if (data.status == 'complete')
			{
				this.infomation = data;
				
			}
			
        })

		
    	
  	}
  	AlertToast(message) {
	    let toast = this.toastCtrl.create({
	      message: message,
	      position: 'top',
	      duration : 3000,
	      cssClass : 'error-submitform'
	    });
	    toast.present();
  	}
}
