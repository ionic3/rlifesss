import { Component } from '@angular/core';
import { NavController, NavParams,ToastController ,AlertController,Refresher,Platform} from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ReffralServerProvider } from '../../providers/reffral-server/reffral-server';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
	customer_id :any;
	infomation = {};
	status_change_pass : any;
	status_update_infomation : any;
	form = {};
  constructor(
  	public navCtrl: NavController, 
	public navParams: NavParams,
	public storage: Storage,
	public loadingCtrl: LoadingController,
	public toastCtrl: ToastController,
	public alertCtrl: AlertController,
	public ReffralServer: ReffralServerProvider,
	public platform: Platform,
  	) {

  }

  	ionViewDidLoad() {
  		let loading = this.loadingCtrl.create({
	    content: 'Đang tải dữ liệu...Vui lòng chờ!'
	  	});
	  	loading.present();

	  	this.status_change_pass = false;
	  	this.status_update_infomation = false;

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
						this.infomation['email'] =  data.email;
						this.infomation['id'] =  data.id;
						this.infomation['fullname'] =  data.fullname;
						this.infomation['telephone'] =  data.telephone;
						this.infomation['birthday'] =  data.birthday;

						this.form['fullname'] = data.fullname;
						this.form['telephone'] = data.telephone;
						this.form['birthday'] = data.birthday;
					}
					
		        })

			}
		})

	}

	ShowUpdatePassWord(){
		this.status_change_pass = true;
	}
	HideUpdatePassWord(){
		this.status_change_pass = false;
	}

	ShowUpdateInfomation(){
		this.status_update_infomation = true;
	}
	HideUpdateInfomation(){
		this.status_update_infomation = false;
	}
	

	SubmitForm() {
		
		if (this.form['password'] == undefined || this.form['password'] == '')
		{
			this.AlertToast('Vui lòng nhập mật khẩu mới.');
		}
		else
		{
			
			let loading = this.loadingCtrl.create({
			    content: 'Đang kết nối hệ thống... Vui lòng chờ!'
		  	});

		  	loading.present();

			this.ReffralServer.ChangePassword(this.customer_id,this.form['password'])
	        .subscribe((data) => {
	        	
				if (data.status == 'complete')
				{
					loading.dismiss();
					
					let toast = this.toastCtrl.create({
						message: 'Đổi mật khẩu thành công!',
						position: 'top',
						duration : 2000,
						cssClass : 'alert_success'
					});
					toast.present();

					this.navCtrl.setRoot(LoginPage);
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


	SubmitFormInfomation() {
		
		if (this.form['fullname'] == undefined || this.form['fullname'] == '')
		{
			this.AlertToast('Vui lòng nhập họ tên.');
		}
		else
		{
			if (this.form['telephone'] == undefined || this.form['telephone'] == '')
			{
				this.AlertToast('Vui lòng nhập số điện thoại.');
			}
			else
			{
				if (this.form['birthday'] == undefined || this.form['birthday'] == '')
				{
					this.AlertToast('Vui lòng nhập ngày tháng năm sinh.');
				}	
				else
				{
					let loading = this.loadingCtrl.create({
					    content: 'Đang kết nối hệ thống... Vui lòng chờ!'
				  	});

				  	loading.present();

					this.ReffralServer.UpdateProfile(this.customer_id,this.form['fullname'],this.form['telephone'],this.form['birthday'])
			        .subscribe((data) => {
			        	
						if (data.status == 'complete')
						{
							loading.dismiss();
							
							let toast = this.toastCtrl.create({
								message: 'Cập nhập thông tin thành công!',
								position: 'top',
								duration : 2000,
								cssClass : 'alert_success'
							});
							toast.present();
							this.status_update_infomation = false;
							this.infomation['fullname'] =  this.form['fullname'];
							this.infomation['telephone'] =  this.form['telephone'];
							this.infomation['birthday'] =  (this.form['birthday']).split('T')[0];
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

	doRefresh(refresher: Refresher) {
		

			  	
		refresher.complete();
    	
  	}
}
