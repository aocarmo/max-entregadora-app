import { Usuario } from './../../model/usuario.model';
import { Intimacao } from './../../model/intimacao.model';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, MenuController, ModalController, PopoverController, Platform } from "ionic-angular";
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import { NotificationsPage } from "../notifications/notifications";
import { Storage } from '@ionic/storage';
import { HotelService } from "../../providers/hotel-service";

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
import { MapControllerProvider, MapInstance } from "../../providers/map-controller/map-controller";
import { Diagnostic } from "@ionic-native/diagnostic";
import { FuncoesProvider } from '../../providers/funcoes/funcoes';
import { IntimacoesProvider } from '../../providers/intimacoes/intimacoes';
import { Constantes } from '../../constantes/constantes';
import { Subscription } from 'rxjs';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../../providers/network/network';
import { Geolocation } from '@ionic-native/geolocation';


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

  items: string[];
  showItems: boolean = false;

  public entregas: Intimacao[];
  public usuario: Usuario;
  map_canvas: GoogleMap;




  constructor(public nav: NavController, public navParams: NavParams,
    public menuCtrl: MenuController, public modalCtrl: ModalController,
    public popoverCtrl: PopoverController, public hotelService: HotelService, public autenticacaoProvider: AutenticacaoProvider, private mapCtrl: MapControllerProvider,
    private platform: Platform,
    private googleMaps: GoogleMaps,
    public diagnostic: Diagnostic,
    public intimacoesProvider: IntimacoesProvider,
    public funcoes: FuncoesProvider,
    public storage: Storage,
    public network: Network,
    public networkProvider: NetworkProvider,
    public geolocation: Geolocation,


  ) {
    // set sample datarrr
    this.menuCtrl.swipeEnable(true, 'authenticated');
    this.menuCtrl.enable(true);

  }



  async ionViewWillEnter() {
    let loading = this.funcoes.showLoading("Carregando...");

    await this.storage.get(Constantes.STORAGE_USER).then((data: any) => {
      this.usuario = data;

    });

    if (this.usuario.idPerfil == 5) {
      await this.AtualizarListaIntimacoes().then(async (data: any) => {
       await this.loadMap();
        loading.dismiss();
      });

    } else {
      loading.dismiss();
      await this.loadMap();
    }

  }

  async loadMap() {

    await this.autenticacaoProvider.obterLocalizacaoAtual();


    if (this.map_canvas != null) {

      this.map_canvas.clear();

      if (this.usuario.idPerfil == 5) {

        this.entregas.forEach((data: any) => {

          let htmlInfoWindow = new HtmlInfoWindow();

          let frame: HTMLElement = document.createElement('div');

          frame.innerHTML = [
            '<div style="width: 250px; max-height:300px;">',
            '<h5>' + data.devedor + '</h5><br>',
            ' <span><b>Tentativa: </b>' + data.tentativa + '</span><br>',
            ' <span><b>Endereço: </b>' + data.endereco + '</span><br>',
            ' <span><b>Protocolo: </b>' + data.protocolo + '</span><br>',
            '<a onclick="window.open(this.href, \'_system\'); return false;" style="color: blue;" href="https://www.google.com/maps/dir/?api=1&origin=' + this.autenticacaoProvider.latitudeAtual + ',' + this.autenticacaoProvider.longitiudeAtual + '&destination=' + data.location.position.lat + ',' + data.location.position.lng + '">Iniciar trajeto</a></div>'
          ].join("");
          /*frame.getElementsByTagName("img")[0].addEventListener("click", () => {
            htmlInfoWindow.setBackgroundColor('red');
          });*/

          let corPin = "green";

          if (data.idTentativaEntrega == 2) {
            corPin = "yellow"
          } else if (data.idTentativaEntrega == 3) {
            corPin = "red"
          }

          let options: MarkerOptions = {
            icon: corPin,
            position: { lat: data.location.position.lat, lng: data.location.position.lng },
            draggable: true,
            disableAutoPan: true
          };

          /*  htmlInfoWindow.setContent(frame, {
              width: "100px",
              height: "100px"
            });*/

          htmlInfoWindow.setContent(frame);


          let marker: Marker = this.map_canvas.addMarkerSync(options);

          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            htmlInfoWindow.open(marker);
          });

        });

      }


    } else {

      let latInicial = -12.991814;
      let lngInicial = -38.469426;
      if(this.entregas != null &&  this.entregas != []){
        let latInicial = this.entregas[0].location.position.lat;
        let lngInicial = this.entregas[0].location.position.lng;
      }

      this.map_canvas = GoogleMaps.create('map_canvas', {
        camera: {
          target: { lat: latInicial, lng: lngInicial},
          zoom: 12,
          tilt: 30
        }
      });

      this.entregas.forEach((data: any) => {

        let htmlInfoWindow = new HtmlInfoWindow();

        let frame: HTMLElement = document.createElement('div');
        frame.innerHTML = [
          '<div style="width: 250px; max-height:300px;">',
          '<h5>' + data.devedor + '</h5><br>',
          ' <span><b>Tentativa: </b>' + data.tentativa + '</span><br>',
          ' <span><b>Endereço: </b>' + data.endereco + '</span><br>',
          ' <span><b>Protocolo: </b>' + data.protocolo + '</span><br>',
          '<a onclick="window.open(this.href, \'_system\'); return false;" style="color: blue;" href="https://www.google.com/maps/dir/?api=1&origin=' + this.autenticacaoProvider.latitudeAtual + ',' + this.autenticacaoProvider.longitiudeAtual + '&destination=' + data.location.position.lat + ',' + data.location.position.lng + '">Iniciar trajeto</a></div>'
        ].join("");

        /*frame.getElementsByTagName("img")[0].addEventListener("click", () => {
          htmlInfoWindow.setBackgroundColor('red');
        });*/

        let corPin = "green";

        if (data.idTentativaEntrega == 2) {
          corPin = "yellow"
        } else if (data.idTentativaEntrega == 3) {
          corPin = "red"
        }

        let options: MarkerOptions = {
          icon: corPin,
          position: { lat: data.location.position.lat, lng: data.location.position.lng },
          draggable: true,
          disableAutoPan: true
        };

        /*htmlInfoWindow.setContent(frame, {
          width: "100px",
          height: "100px"
        });*/

        htmlInfoWindow.setContent(frame);


        let marker: Marker = this.map_canvas.addMarkerSync(options);

        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          htmlInfoWindow.open(marker);
        });

      });


    }



  }


  /*loadMap() {
  //  let loading = this.funcoes.showLoading("Carregando...");
    if(this.map_canvas != null){
  
      this.map_canvas.clear();
  
      if(this.usuario.idPerfil == 5){
  
        this.entregas.forEach((data: any) => {
  
          let corPin = "green";
    
          if(data.idTentativaEntrega == 2 ){
            corPin = "yellow"
          }else if(data.idTentativaEntrega == 3 ){
            corPin = "red"
          }
    
          let options: MarkerOptions = {
            icon: corPin,    
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
   
  
    }else{
  
   
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
  
      if(this.usuario.idPerfil == 5){
        this.entregas.forEach((data: any) => {
  
          let corPin = "green";
      
          if(data.idTentativaEntrega == 2 ){
            corPin = "yellow"
          }else if(data.idTentativaEntrega == 3 ){
            corPin = "red"
          }
          let options: MarkerOptions = {
            icon: corPin,    
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
       
    }
    
   
    //loading.dismiss();
  
  }*/

  presentNotifications(myEvent) {
    // console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }


  async AtualizarListaIntimacoes(): Promise<any> {


    await this.storage.get(this.usuario.id.toString()).then(async (intimacoesLocal: any) => {

      if (intimacoesLocal != null) {
        this.entregas = intimacoesLocal;


        if (this.networkProvider.previousStatus == 0) {
          this.ObterListaIntimacoes();
        }

      } else {

        if (this.networkProvider.previousStatus == 0) {

          await this.intimacoesProvider.ObterListaIntimacoes().then(async (intimacoesAPI: any) => {

            if (intimacoesAPI.ok) {

              this.storage.set(this.usuario.id.toString(), intimacoesAPI.retorno);
              this.entregas = intimacoesAPI.retorno;



            } else {

              this.funcoes.showAlert(intimacoesAPI.msg);

            }

          }).catch((err) => {
            console.log(JSON.stringify(err));

          });
        } else {
          this.funcoes.showAlert(Constantes.INTERNET_INDISPONIVEL);
        }

      }


    }).catch((err: any) => {


    });


  }

  ObterListaIntimacoes() {

    this.intimacoesProvider.ObterListaIntimacoes().then(async (intimacoesAPI: any) => {

      if (intimacoesAPI.ok) {

        this.storage.set(this.usuario.id.toString(), intimacoesAPI.retorno);
        //this.entregas = intimacoesAPI.retorno; 
      }

    }).catch((err) => {
      console.log(JSON.stringify(err));

    });
  };

  /*
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
  }*/

}

//

