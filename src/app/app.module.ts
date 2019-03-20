import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { Network } from '@ionic-native/network';

import { ProfilePage } from '../pages/profile/profile';
import { WalletPage } from '../pages/wallet/wallet';
import { PersonalSalesPage } from '../pages/personal-sales/personal-sales';
import { SecondaryPasswordPage } from '../pages/secondary-password/secondary-password';
import { InfomationPage } from '../pages/infomation/infomation';
import { SharePage } from '../pages/share/share';
import { SystemPage } from '../pages/system/system';
//import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { WithdrawPage } from '../pages/withdraw/withdraw';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Clipboard } from '@ionic-native/clipboard';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { RegisterServerProvider } from '../providers/register-server/register-server';
import { ReffralServerProvider } from '../providers/reffral-server/reffral-server';
import { Camera } from '@ionic-native/camera';
import { HeaderColor } from '@ionic-native/header-color';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileTransfer } from '@ionic-native/file-transfer'; 
import { SocialSharing } from '@ionic-native/social-sharing';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    WalletPage,
    PersonalSalesPage,
    SecondaryPasswordPage,
    InfomationPage,
    SharePage,
    WithdrawPage,
    SystemPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    WalletPage,
    PersonalSalesPage,
    SecondaryPasswordPage,
    InfomationPage,
    SharePage,
    WithdrawPage,
    SystemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterServerProvider,
    Network,
    Clipboard,
    ReffralServerProvider,
    BarcodeScanner,
    Camera,
    HeaderColor,
    InAppBrowser,
    FileTransfer,
    SocialSharing
    
  ]
})
export class AppModule {}
