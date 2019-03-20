import { Component } from '@angular/core';
import { NavController, NavParams,ToastController ,AlertController,Refresher} from 'ionic-angular';

import { RegisterPage } from '../register/register';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { RegisterServerProvider } from '../../providers/register-server/register-server';
import { ReffralServerProvider } from '../../providers/reffral-server/reffral-server';
@Component({
  selector: 'page-system',
  templateUrl: 'system.html'
})
export class SystemPage {
	balance = {};
	price_coin = {};
	customer_id :any;
	count_history = 0;
	member = {};
	click_member = [];
	tabs :any;
	history : any;
  constructor(
  	public navCtrl: NavController, 
	public navParams: NavParams,
	public RegisterServerProvider : RegisterServerProvider,
	public storage: Storage,
	public loadingCtrl: LoadingController,
	public toastCtrl: ToastController,
	public alertCtrl: AlertController,
	public ReffralServer: ReffralServerProvider
	
  	) {

  }

  	ionViewDidLoad() {
  		let loading = this.loadingCtrl.create({
	    	content: 'Đang tải dữ liệu...Vui lòng chờ!'
	  	});
	  	loading.present();
  		this.storage.get('customer_id')
		.then((customer_id) => {
			if (customer_id) 
			{
				this.customer_id = customer_id;
				
			  	this.tabs = 'nkd';
		  		this.RegisterServerProvider.GetTree(this.customer_id)
		        .subscribe((data) => {
		        	loading.dismiss();
					if (data.status == 'complete')
					{
						this.member = data;
						this.click_member.push(this.customer_id);
					}
					
		        })

		        this.ReffralServer.GetMember(this.customer_id)
		        .subscribe((data) => {
					if (data)
					{
				  		this.history =  data;
				  		this.count_history = data.length;
					}
					
		        })
			}
		})
		  		

	}

	ClickBack(){
		if (this.click_member.length > 1)
		{
			let loading = this.loadingCtrl.create({
			    content: 'Đang tải dữ liệu... Vui lòng chờ!'
		  	});
	  		loading.present();

			this.click_member.splice(this.click_member.length-1, 1);
			this.RegisterServerProvider.GetTree(this.click_member[this.click_member.length-1])
	        .subscribe((data) => {
	        	loading.dismiss();
				if (data.status == 'complete')
				{
					this.member = data;
				}
	        })
		}
	}

	ClickTop(){

		let loading = this.loadingCtrl.create({
		    content: 'Đang tải dữ liệu... Vui lòng chờ!'
	  	});
  		loading.present();
		this.RegisterServerProvider.GetTree(this.customer_id)
        .subscribe((data) => {
        	loading.dismiss();
			if (data.status == 'complete')
			{
				this.member = data;
			}
        })
		
	}
	
	LoadTree(customer_id){
		let loading = this.loadingCtrl.create({
		    content: 'Đang tải dữ liệu... Vui lòng chờ!'
	  	});
  		loading.present();
		this.click_member.push(customer_id);
		this.RegisterServerProvider.GetTree(customer_id)
        .subscribe((data) => {
        	loading.dismiss();
			if (data.status == 'complete')
			{
				this.member = data;
			}
        })
	}

	ChangeTab(item){
		this.tabs = item;
	}
 
	AddMember(p_binary,position){
		
		this.navCtrl.push(RegisterPage,{'customer_id' : this.customer_id,'p_binary' : p_binary, 'position' : position});
	}

	doRefresh(refresher: Refresher) {
		this.RegisterServerProvider.GetTree(this.customer_id)
        .subscribe((data) => {
        	
			if (data.status == 'complete')
			{
				this.member = data;
				this.click_member.push(this.customer_id);
			}
			
        })

        this.ReffralServer.GetMember(this.customer_id)
        .subscribe((data) => {
			if (data)
			{
		  		this.history =  data;
		  		this.count_history = data.length;
			}
			refresher.complete();
        })

			  	
		
    	
  	}
}
