import { Component } from '@angular/core';
import { NavController, NavParams,ToastController ,AlertController,Refresher} from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

import { HeaderColor } from '@ionic-native/header-color';
@Component({
  selector: 'page-infomation',
  templateUrl: 'infomation.html'
})
export class InfomationPage {
	balance = {};
	price_coin = {};
	customer_id :any;
	count_notifications = 0;
  constructor(
  	public navCtrl: NavController, 
	public navParams: NavParams,
	public storage: Storage,
	public loadingCtrl: LoadingController,
	public toastCtrl: ToastController,
	public alertCtrl: AlertController,
	private headerColor: HeaderColor
  	) {

  }

  ionViewDidLoad() {
  		

	}

	
	
	doRefresh(refresher: Refresher) {
		

			  	
		refresher.complete();
    	
  	}
}
