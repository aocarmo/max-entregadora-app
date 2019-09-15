import { Usuario } from './../model/usuario.model';
import { AutenticacaoProvider,  } from './../providers/autenticacao/autenticacao';
import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import {Storage} from "@ionic/storage";
import { Constantes } from '../constantes/constantes';


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
  usuario: Usuario = new Usuario(); 

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private storage: Storage,
    public autenticacaoProvider: AutenticacaoProvider
  ) {

    
     //Verifica fica escutando se existe usuario logado para exibir dados no menu
     this.autenticacaoProvider.isLoggedIn().subscribe((data: boolean) => {
       
      if (data) {  
       
        this.storage.get(Constantes.STORAGE_USER).then((data: any) => {
                 
          this.usuario =data;  
          
          this.appMenuItems = [
          
            {title: 'Minhas Entregas', component: 'page-home', icon: 'fas fa-mail-bulk'},
          //  {title: 'Minhas ', component: 'page-message-list', icon: 'mail'}, 
            {title: 'Contato', component: 'page-support', icon: 'fas fa-phone'},
      
          
          ];

        });

      }
    });


    this.initializeApp();
    // this.app.getRootNavs()[0]
    // this.app._rootNavs.map(page => {
    //   console.log(page)
    // })
    // console.log(this.nav)

   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      if(this.autenticacaoProvider.authenticated()){
         this.nav.setRoot('page-home');      
       }else{      
         this.logout();
       }

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
  
    this.autenticacaoProvider.doLogout();
    this.nav.setRoot('page-login');
  }

  editProfile() {
    this.nav.setRoot('page-edit-profile');
  }

}
