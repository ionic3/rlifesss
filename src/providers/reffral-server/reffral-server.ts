import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import *  as MyConfig from '../../providers/myConfig'
/*
  Generated class for the DepositServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReffralServerProvider {

  	constructor(public http: Http) {
    	//console.log('Hello DepositServerProvider Provider');
  	}
    GetMember(customer_id: string){
      let body = {customer_id: customer_id};
      return this.http.post(MyConfig.data.url+'/api/get-member',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }
    GetInfomationUser(customer_id: string){
      let body = {customer_id: customer_id};
      return this.http.post(MyConfig.data.url+'/api/get-infomation-user',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }
    CalculationSystemAccount(customer_id: string){
      let body = {customer_id: customer_id};
      return this.http.post(MyConfig.data.url+'/api/commission-calculation-system',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }
    

    ChangePassword(customer_id: string,password_new: string){
      let body = {customer_id: customer_id, password_new: password_new};
      return this.http.post(MyConfig.data.url+'/api/change-password',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }

    GetHisroryCommisionTrucHe(customer_id: string){
      let body = {customer_id: customer_id};
      return this.http.post(MyConfig.data.url+'/api/get-history-commision-truche',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }

    GetHisroryCommisionCongHuong(customer_id: string){
      let body = {customer_id: customer_id};
      return this.http.post(MyConfig.data.url+'/api/get-history-commision-conghuong',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }

    GetHisroryCommisionNhom(customer_id: string){
      let body = {customer_id: customer_id};
      return this.http.post(MyConfig.data.url+'/api/get-history-commision-nhom',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }

    GetHisroryCommisionThuong(customer_id: string){
      let body = {customer_id: customer_id};
      return this.http.post(MyConfig.data.url+'/api/get-history-commision-thuong',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }
      

    UpdateProfile(customer_id: string, fullname : string, telephone : string, birthday: string){
      let body = {customer_id: customer_id, fullname : fullname, telephone: telephone, birthday: birthday};
      return this.http.post(MyConfig.data.url+'/api/update-imfomation',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }

    Update_Pass2(customer_id: string, password : string){
      let body = {customer_id: customer_id, password : password};
      return this.http.post(MyConfig.data.url+'/api/update-pass-tow',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }

    
    GetVersionApp(){
      let body = {};
      return this.http.post(MyConfig.data.url+'/api/get-version-app',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }

    WithdrawSubmit(customer_id: string,amount : number, account_bank: string,brandname:string, account_horder: string, account_number: string,password_transaction: string){
      let body = {customer_id : customer_id,amount: amount,account_bank : account_bank,brandname:brandname,account_horder: account_horder, account_number: account_number, password_transaction: password_transaction};
      return this.http.post(MyConfig.data.url+'/api/withdraw-submit',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }

    HistoryWithdraw(customer_id: string){
      let body = {customer_id: customer_id};
      return this.http.post(MyConfig.data.url+'/api/history-withdraw',body)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
    }

    private catchError(error : Response){
		//console.log(error);
		return Observable.throw(error.json().error || "server login error");
	}

  	private logResponse(res : Response){
  		//console.log(res);
  	}

  	private extractData(res : Response){
  		
  		return res.json();
  	}
}
