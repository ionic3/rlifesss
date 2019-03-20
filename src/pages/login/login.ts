import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform ,AlertController} from 'ionic-angular';

import { RegisterServerProvider } from '../../providers/register-server/register-server';
import { LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	form = {};
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		private RegisterServer: RegisterServerProvider,
		public storage: Storage,
		public toastCtrl: ToastController,
		public platform: Platform,
		public alertCtrl: AlertController,

		) {
	}

	ionViewDidLoad() {
		this.storage.get('email_login')
		.then((email_login) => {
			this.form['email'] = email_login;
			this.storage.get('password_login')
			.then((password_login) => {
				this.form['password'] = password_login;
				this.form['remember'] = true;
			})
		})

		console.log('ionViewDidLoad LoginPage');
	}

	onSignup() {
		this.navCtrl.setRoot(RegisterPage);
	}
	
	SubmitForm() {
		
		if (this.form['email'] == undefined || this.form['email'] == '')
		{
			this.AlertToast('Vui lòng nhập địa chỉ email.');
		}
		else
		{
			if (this.form['password'] == undefined || this.form['password'] == '')
			{
				this.AlertToast('Vui lòng nhập mật khẩu.');
			}
			else
			{	
				let loading = this.loadingCtrl.create({
				    content: 'Đang đăng nhập... Vui lòng chờ!'
			  	});

			  	loading.present();

				this.RegisterServer.Login(this.form['email'],this.form['password'])

		        .subscribe((data) => {
		        	
					if (data.status == 'complete')
					{
						loading.dismiss();
						this.storage.set('customer_id', data.customer_id); 

						if(this.form['remember'])
						{
							this.storage.set('email_login', this.form['email']); 
							this.storage.set('password_login', this.form['password']); 
						}

						let toast = this.toastCtrl.create({
							message: 'Đăng nhập thành công!',
							position: 'top',
							duration : 2000,
							cssClass : 'alert_success'
						});
						toast.present();

						this.navCtrl.setRoot(HomePage);
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
