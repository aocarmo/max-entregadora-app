import { Geolocation } from '@ionic-native/geolocation';
import { Usuario } from './../model/usuario.model';
import { AutenticacaoProvider,  } from './../providers/autenticacao/autenticacao';
import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, Events } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import {Storage} from "@ionic/storage";
import { Constantes } from '../constantes/constantes';
import { NetworkProvider } from '../providers/network/network';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs';


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
  localizacao: Subscription;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private storage: Storage,
    public autenticacaoProvider: AutenticacaoProvider,
    public network: Network,
    public events: Events,
    public networkProvider: NetworkProvider,   
    public geolocation: Geolocation
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

      this.localizacao = this.geolocation.watchPosition()
              .filter((p) => p.coords !== undefined) //Filter Out Errors
              .subscribe(position => {
            
                this.autenticacaoProvider.RegistrarLocalizacaoAtual(position.coords.latitude,position.coords.longitude).then((data:any)=>{
                  console.log(JSON.stringify(data));
                  
                });
        console.log(position.coords.longitude + ' ' + position.coords.latitude);
      });

      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
          //alert('network:offline ==> '+this.network.type);    
      });

      // Online event
      this.events.subscribe('network:online', () => {
          //alert('network:online ==> '+this.network.type);        
   });
    
        //Pega os dados de usuario da sessão
        this.storage.get(Constantes.STORAGE_USER).then((data: any) => {
          //Verifica se existe usuario logado com informações salvas no local storage, caso exista manda para tela inicial
           if (data != null) {
          
            if(this.autenticacaoProvider.isTokenExpired()){  
          
              this.logout();
            }else{
          
              this.splashScreen.hide();
              //Informa a obeservable que o usuario permanece logado
              this.autenticacaoProvider.permanecerLogado(true);        
              this.usuario = data;
              this.nav.setRoot('page-home', { 'usuario': this.usuario });
            }
         
   
           } else {            
          
             this.statusBar.styleDefault();
             this.statusBar.overlaysWebView(false);   
             this.logout();
           
           }
   
         });
   
       });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
  
    this.autenticacaoProvider.doLogout();
    this.localizacao.unsubscribe();
    this.nav.setRoot('page-login');
  }

  editProfile() {
    this.nav.setRoot('page-edit-profile',  { 'usuario': this.usuario });
  }

}
