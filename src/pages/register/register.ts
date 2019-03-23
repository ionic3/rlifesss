import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,Platform ,AlertController } from 'ionic-angular';


import { RegisterServerProvider } from '../../providers/register-server/register-server';
import { LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	form = {};
	scannedCode : any;
	customer_sponser = '';
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		private RegisterServer: RegisterServerProvider,
		private barcodeScanner: BarcodeScanner,
		public toastCtrl: ToastController,
		public platform: Platform,
		public alertCtrl: AlertController,
		public storage: Storage,
	) 
	{

	}

	

	ionViewDidLoad() {
		
		console.log('ionViewDidLoad RegisterPage');
	}
	
	validateEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}
	SubmitForm() {
		if (this.form['fullname'] == undefined || this.form['fullname'] == '')
		{
			this.AlertToast('Vui lòng nhập họ tên.');
		}
		else{
			if (!this.validateEmail(this.form['email'])){
				this.AlertToast('Vui lòng nhập email.');
			}
			else{
				if (this.form['cmnd'] == undefined || this.form['cmnd'] == '')
				{
					this.AlertToast('Vui lòng nhập số chứng minh thư.');
				}
				else{
					if (this.form['birthday'] == undefined || this.form['birthday'] == '')
					{
						this.AlertToast('Vui lòng nhập ngày tháng năm sinh.');
					}
					else{
						if (this.form['telephone'] == undefined || this.form['telephone'] == '')
						{
							this.AlertToast('Vui lòng nhập số điện thoại.');
						}
						else{
							if (this.form['address'] == undefined || this.form['address'] == '')
							{
								this.AlertToast('Vui lòng nhập địa chỉ nhà.');
							}
							else{
								if (this.form['account_horder'] == undefined || this.form['account_horder'] == '')
								{
									this.AlertToast('Vui lòng nhập tên tài khoản ngân hàng.');
								}
								else{
									if (this.form['account_number'] == undefined || this.form['account_number'] == '')
									{
										this.AlertToast('Vui lòng nhập số tài khoản ngân hàng.');
									}
									else{
										if (this.form['bankname'] == undefined || this.form['bankname'] == '')
										{
											this.AlertToast('Vui lòng nhập tên ngân hàng.');
										}
										else{
											if (this.form['brandname'] == undefined || this.form['brandname'] == '')
											{
												this.AlertToast('Vui lòng nhập chi nhánh ngân hàng.');
											}
											else{
												if (this.form['password'] == undefined || this.form['password'] == '')
												{
													this.AlertToast('Vui lòng nhập mật khẩu.');
												}
												else{
													let loading = this.loadingCtrl.create({
													    content: 'Đang tạo tài khoản thành viên... Vul lòng chờ!'
												  	});

												  	loading.present();
												  	
												  	let p_node = this.navParams.get("customer_id");
												  	let p_binary = this.navParams.get("p_binary");
												  	let position = this.navParams.get("position");

													this.RegisterServer.Signup(
														this.form['fullname'],
														this.form['email'],
														this.form['cmnd'],
														this.form['birthday'],
														this.form['telephone'],
														this.form['address'],
														this.form['account_horder'],
														this.form['account_number'],
														this.form['bankname'],
														this.form['brandname'],
														this.form['password'],
														p_node,
														p_binary,
														position
													)
											        .subscribe((data) => {
														if (data.status == 'complete')
														{
															loading.dismiss();
															let toast = this.toastCtrl.create({
														      message: 'Thêm thành viên thành công',
														      position: 'top',
														      duration : 3000,
														      cssClass : 'alert_success'
														      
														    });
														    toast.present();	
															this.navCtrl.pop();
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
								}
							}
						}
					}
				}
			}
		}
		
	}


	scanCode() {
    
	    this.barcodeScanner.scan({
	      preferFrontCamera : false,
	      showFlipCameraButton : true,
	      showTorchButton : true,
	      disableSuccessBeep : true,
	      prompt : ''
	    }).then(barcodeData => {
	      this.scannedCode = barcodeData.text;
	      
	      let string = barcodeData.text;
	      let string_slip = string.split("_");

	      if (string_slip[1])
	      {
	      	this.customer_sponser = string_slip[0].slice(9);
		    let toast = this.toastCtrl.create({
		      message: 'You are registered with sponser '+string_slip[1],
		      position: 'top',
		      duration : 2000,
		      cssClass : 'alert_success'
		      
		    });
		    toast.present();
	      }
	      else
	      {
	      	this.noQrcode();
	      }
	      	
		  
  		  
	    }, (err) => {
	        this.noQrcode();
	        console.log('Error: ', err);
	    });
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
	noQrcode() {
		let toast = this.toastCtrl.create({
	      message: 'Error Qrcode',
	      position: 'top',
	      duration : 3000,
	      cssClass : 'error-submitform'
	    });
	    toast.present();
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
