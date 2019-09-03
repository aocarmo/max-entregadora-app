import { AutenticacaoProvider,  } from './../providers/autenticacao/autenticacao';
import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import {Storage} from "@ionic/storage";


export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class ionBookingApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "page-login";
  showMenu: boolean = true;
  // rootNavCtrl: NavController;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private storage: Storage,
    public autenticacaoProvider: AutenticacaoProvider
  ) {
    this.initializeApp();
    // this.app.getRootNavs()[0]
    // this.app._rootNavs.map(page => {
    //   console.log(page)
    // })
    // console.log(this.nav)

    this.appMenuItems = [
    
      {title: 'Entregas', component: 'page-home', icon: 'fas fa-motorcycle'},
    //  {title: 'Minhas ', component: 'page-message-list', icon: 'mail'}, 
      {title: 'Contato', component: 'page-support', icon: 'fas fa-phone'},

    
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
  
    this.nav.setRoot('page-login');
    this.storage.remove('token');
    this.storage.remove('profile');

    if(this.autenticacaoProvider.authenticated()){
      console.log('não deslogou');
      
    }else{
      console.log('deslogou');
    }
    
  }

  editProfile() {
    this.nav.setRoot('page-edit-profile');
  }

}
