import { Component } from '@angular/core';
import { NavController, NavParams,ToastController ,AlertController} from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {
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
	private socialSharing: SocialSharing
	
  	) {

  }

  ionViewDidLoad() {
  		

	}

	ShareApp(){
		 this.socialSharing.shareWithOptions( {
         message: "Tải ACT-LIFE",
         subject: "Tải ACT-LIFE",
         url: "https://atc-life.com",
	     }).then((data) =>
	     {
	       console.log('Shared via SharePicker' + data);
	     })
	     .catch((err) =>
	     {
	       console.log('Was not shared via SharePicker' + err);

	     })
	     ;
	}
	
	
}
