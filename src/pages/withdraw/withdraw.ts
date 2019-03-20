import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,InfiniteScroll,ToastController ,AlertController,Refresher,Platform} from 'ionic-angular';


import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ReffralServerProvider } from '../../providers/reffral-server/reffral-server';
/**
 * Generated class for the DepositPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {
	infomation = {};
	form = {};
	customer_id :any;
	history : any;
	
	count_history = 0;
	
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
	public storage: Storage,
	public loadingCtrl: LoadingController,
	public toastCtrl: ToastController,
	public alertCtrl: AlertController,
  	public platform: Platform,
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
						this.form['account_horder'] = data.fullname;
					}
		        })

		        this.ReffralServer.HistoryWithdraw(this.customer_id)
		        .subscribe((data) => {
					if (data)
					{
						this.count_history = data.length;
						this.history = data;
					}
					
		        })
		  	} 
		})
  		
  	}

	onChangeInput(value){
		this.form['amount_estimate'] = this.Formatnumber(parseFloat(value)*parseFloat(this.infomation['price_rl']));
	}
	WithdrawAll(){
		this.form['amount'] = parseFloat(this.infomation['balance_wallet']);
		this.form['amount_estimate'] = this.Formatnumber(parseFloat(this.infomation['balance_wallet'])*parseFloat(this.infomation['price_rl']));
	}

	

	doInfinite(infiniteScroll : InfiniteScroll) {
	  	
        infiniteScroll.complete();
	}

	SubmitForm() {
		
		if (this.form['amount'] == null || this.form['amount'] === "" || parseFloat(this.form['amount']) < 100)
		{
			this.AlertToast('Vui lòng nhập số RL để rút. Số RL phải lớn hơn 100');
		}
		else
		{
			if (this.form['account_bank'] == null || this.form['account_bank'] === "")
			{
				this.AlertToast('Vui lòng nhập tên ngân hàng.');
			}
			else
			{
				if (this.form['brandname'] == null || this.form['brandname'] === "")
				{
					this.AlertToast('Vui lòng nhập chi nhánh ngân hàng.');
				}
				else
				{
					if (this.form['account_horder'] == null || this.form['account_horder'] === "" )
					{
						this.AlertToast('Vui lòng nhập tên tài khoản');
					}
					else
					{
						if (this.form['account_number'] == '' || this.form['account_number'] == null  )
						{
							this.AlertToast('Vui lòng nhập số  tài khoản');
						}
						else
						{
							if (this.infomation['status_password_transaction'] == true)
							{
								if (this.form['password_transaction'] == '' || this.form['password_transaction'] == null  )
								{
									this.AlertToast('Vui lòng nhập mật khẩu cấp 2');
								}
								else
								{
									this.WithdrawLoading();
								}
							}
							else
							{
								this.WithdrawLoading();
							}
							
						}	
					}
				}	
			}
		}
	}

	WithdrawLoading(){
		const confirm = this.alertCtrl.create({
		title: 'Xác nhận rút ?',
		message: 'Bạn có đồng ý rút <b>'+this.form['amount']+'</b> RL với<br/> Tên ngân hàng: <b>'+this.form['account_bank']+'</b>.<br/>Chi nhánh: <b>'+this.form['brandname']+'</b>.<br/>Tên tài khoản: <b>'+this.form['account_horder']+'</b>.<br/>Số tài khoản: <b>'+this.form['account_number']+'</b>.',
		buttons: [
		{
		  text: 'Hủy bỏ',
		  handler: () => {
		    
		  }
		},
		{
		  text: 'Xác nhận',
		  handler: () => {
		  	

		  	let loadingss = this.loadingCtrl.create({
		    	content: 'Đang thực hiện... Vui lòng chờ!'
		  	});
		  	loadingss.present();
		  	
		  	let password_transaction = '';
		  	if (this.infomation['status_password_transaction'] == true)
			{
				password_transaction = this.form['password_transaction'];
			}

			this.ReffralServer.WithdrawSubmit(
				this.customer_id,
				parseFloat(this.form['amount']),
				this.form['account_bank'],
				this.form['brandname'],
				this.form['account_horder'],
				this.form['account_number'],
				password_transaction)
		    .subscribe((data) => {
				if (data.status == 'complete')
				{
			  		
					loadingss.dismiss();
					let toast = this.toastCtrl.create({
						message: 'Rút thành công.',
						position: 'top',
						duration : 2000,
						cssClass : 'alert_success'
					});
					toast.present();
					this.form['amount_estimate'] = 0;
					this.form['amount'] = 0;
					this.form['account_bank'] = '';
					this.form['brandname'] = '';
					this.form['account_horder'] = '';
					this.form['account_number'] = '';
					if (this.infomation['status_password_transaction'] == true)
					{
						this.form['password_transaction'] = ''
					}
					this.infomation['balance_wallet'] = parseFloat(this.infomation['balance_wallet']) - parseFloat(this.form['amount'])
				}
				else
				{
					this.AlertToast(data.message);
					
		      		loadingss.dismiss();
		      	}
		    },
		    (err) => {
		    	if (err)
		    	{
		    		loadingss.dismiss();
		    		this.SeverNotLogin();
		    	}
		    })

		  	
		  	
		  }
		}
		]
		});
		confirm.present();
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
