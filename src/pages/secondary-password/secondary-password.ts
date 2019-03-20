import { Component } from '@angular/core';
import { NavController, NavParams,ToastController ,AlertController,Refresher,Platform} from 'ionic-angular';


import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ReffralServerProvider } from '../../providers/reffral-server/reffral-server';
@Component({
  selector: 'page-secondary-password',
  templateUrl: 'secondary-password.html'
})
export class SecondaryPasswordPage {
	form = {};
	customer_id : any;
  constructor(
  	public navCtrl: NavController, 
	public navParams: NavParams,

	public storage: Storage,
	public loadingCtrl: LoadingController,
	public toastCtrl: ToastController,
	public alertCtrl: AlertController,
	public ReffralServer: ReffralServerProvider,
	public platform: Platform
  	) {

  }

  	ionViewDidLoad() {
  		this.storage.get('customer_id')
		.then((customer_id) => {
			if (customer_id) 
			{
				this.customer_id = customer_id;

			}
		})

	}

	SubmitForm() {
		
		if (this.form['password'] != undefined && this.form['password'] != '')
		{
			if (this.form['re_password'] != undefined && this.form['re_password'] != '')
			{
				
				if (this.form['password'] == this.form['re_password'])
				{
					
					let loading = this.loadingCtrl.create({
					    content: 'Đang tạo tài khoản thành viên... Vul lòng chờ!'
				  	});

				  	loading.present();
				  	
				  	
					this.ReffralServer.Update_Pass2(this.customer_id,this.form['password'])
			        .subscribe((data) => {
						if (data.status == 'complete')
						{
							loading.dismiss();
							let toast = this.toastCtrl.create({
						      message: 'Đặt mập khẩu cấp hai thành công',
						      position: 'top',
						      duration : 3000,
						      cssClass : 'alert_success'
						      
						    });
						    toast.present();
						    this.form['password'] = '';
						    this.form['re_password'] = '';
						}
						else
						{
							loading.dismiss();
							this.AlertToast(data.message);
							
						}
			        },
			        (err) => {
			        	if (err)
			        	{
			        		loading.dismiss();
			        		this.SeverNotLogin();
			        	}
			        })
			    }
			    else
			    {
			    	this.AlertToast('Hai mật khẩu không trùng khớp');
			    }
				
			}
			else
			{
				this.AlertToast('Bạn chưa nhập lại mật khẩu.');
			}
		
				
		}
		else
		{
			this.AlertToast('Bạn chưa nhập mật khẩu.');
		}
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
	
	doRefresh(refresher: Refresher) {
		

			  	
		refresher.complete();
    	
  	}
  	SeverNotLogin(){
  		const confirm = this.alertCtrl.create({
		title: 'System maintenance',
		message: 'The system is updating. Please come back after a few minutes',
		buttons: [
		{
		  text: 'Cancel',
		  handler: () => {
		    
		  }
		},
		{
		  text: 'Exit',
		  handler: () => {
		   	this.platform.exitApp();
		  }
		}
		]
		});
		confirm.present();
  	}
}
