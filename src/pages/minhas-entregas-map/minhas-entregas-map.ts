import { Usuario } from './../../model/usuario.model';
import { Intimacao } from './../../model/intimacao.model';
import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams, MenuController, ModalController, PopoverController, Platform} from "ionic-angular";
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import {NotificationsPage} from "../notifications/notifications";
import { Storage } from '@ionic/storage';
import {HotelService} from "../../providers/hotel-service";

import { AutenticacaoProvider } from "../../providers/autenticacao/autenticacao";
import { ENTREGAS } from "../../mocks/mock-entregas";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  HtmlInfoWindow,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { MapControllerProvider,MapInstance } from "../../providers/map-controller/map-controller";
import { Diagnostic } from "@ionic-native/diagnostic";
import { FuncoesProvider } from '../../providers/funcoes/funcoes';
import { IntimacoesProvider } from '../../providers/intimacoes/intimacoes';
import { Constantes } from '../../constantes/constantes';


//const mapId = 'HOME_MAP';
/**
 * Generated class for the MinhasEntregasMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'page-minhas-entregas-map',
  segment: 'map',
  priority: 'high'
})



@Component({
  selector: 'page-minhas-entregas-map',
  templateUrl: 'minhas-entregas-map.html',
})
export class MinhasEntregasMapPage {
 // private hMap: MapInstance;
  dDate: Date = new Date();
  searchQuery: string = '';
  items: string[];
  showItems: boolean = false;
 
  public entregas: Intimacao[];
  public usuario:Usuario;
  map_canvas: GoogleMap;

  public childs: any;

  public hotellocation: string;

  // list of hotels
  public hotels: any;


  constructor(public nav: NavController, public navParams: NavParams, 
    public menuCtrl: MenuController, public modalCtrl: ModalController, 
    public popoverCtrl: PopoverController, public hotelService: HotelService,public autenticacaoProvider: AutenticacaoProvider, private mapCtrl: MapControllerProvider,
    private platform: Platform,
    private googleMaps: GoogleMaps,
    public diagnostic: Diagnostic,
    public intimacoesProvider: IntimacoesProvider,
    public funcoes: FuncoesProvider,
    public storage: Storage
    
    ) {
      // set sample datarrr
this.menuCtrl.swipeEnable(true, 'authenticated');
this.menuCtrl.enable(true);
this.hotels = hotelService.getAll();
this.entregas = this.navParams.get('intimacoes');
this.usuario = this.navParams.get('usuario');

}


ionViewWillEnter() {
  this.ObterListaIntimacoes().then((data:any)=>{
    this.loadMap();
    
  });
//
}


loadMap() {

  // This code is necessary for browser
  Environment.setEnv({
    'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyB_6IGpyQsPTenu0afoaBM7csRPLbtryoo',
    'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyB_6IGpyQsPTenu0afoaBM7csRPLbtryoo'
  });

  let mapOptions: GoogleMapOptions = {
    camera: {
       target: {
         lat: -12.991814,
         lng:  -38.469426
       },
       zoom: 12,
       tilt: 30
     }
  };

  
  this.map_canvas = GoogleMaps.create('map_canvas',mapOptions);
 
  this.entregas.forEach((data: any) => {

    let options: MarkerOptions = {
      icon: 'red',    
      title: data.devedor,   
      position: {lat: data.location.position.lat, lng: data.location.position.lng}, 
      zIndex: 0,    
      disableAutoPan: true
    };
   
    let marker: Marker = this.map_canvas.addMarkerSync(options);
    //marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
    //marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onMarkerClick);
  });


}






presentNotifications(myEvent) {
  // console.log(myEvent);
  let popover = this.popoverCtrl.create(NotificationsPage);
  popover.present({
    ev: myEvent
  });
}

async ObterListaIntimacoes(): Promise<any> {    

let loading = this.funcoes.showLoading("Carregando o mapa...");

 await this.intimacoesProvider.ObterListaIntimacoes().then(async (intimacoesAPI: any) => {

    if(intimacoesAPI.ok){
      
      await this.storage.get(Constantes.INTIMACOES).then(async (intimacoesLocal: any) => {      
    
        if(intimacoesLocal != null) {       

          let localJSON = JSON.stringify(intimacoesLocal);
          let APIJSON = JSON.stringify(intimacoesAPI.retorno);
          
          if(APIJSON != localJSON){
        
            this.storage.set(Constantes.INTIMACOES,intimacoesAPI.retorno);
            loading.dismiss();
            this.entregas = intimacoesAPI.retorno;

          }else{            
            loading.dismiss();
            this.entregas = intimacoesLocal;
          }

        }else{
          this.storage.set(Constantes.INTIMACOES,intimacoesAPI.retorno);
          loading.dismiss();
          this.entregas = intimacoesAPI.retorno;
        }


      }).catch((err: any) => {
        loading.dismiss();

      });      

    }

    
  }).catch((err) => {
    console.log(JSON.stringify(err));
    loading.dismiss();

  });
}

}

//

