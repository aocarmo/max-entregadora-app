import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  HtmlInfoWindow
} from '@ionic-native/google-maps';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
/**
 * Generated class for the DetalheEntregaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-detalhe-entrega',
  segment: 'detalhe',
  priority: 'high'
})
@Component({
  selector: 'page-detalhe-entrega',
  templateUrl: 'detalhe-entrega.html',
})
export class DetalheEntregaPage {
  mapReady: boolean = false;
  map: GoogleMap;
 public entrega : any;
 lat: number = -12.991814;
  lng: number = -38.469426;
  zoom: number = 20;

  constructor(public navCtrl: NavController, public navParams: NavParams,public autenticacaoProvider: AutenticacaoProvider) {

    this.entrega = this.navParams.get('entrega');
 
  }

  registrarPreBaixa(entrega: any){
    this.navCtrl.push('page-pre-baixa',{'entrega': this.entrega});
  }
  
  ionViewDidEnter() {
    
    this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    let latInicial = -12.991814;
    let lngInicial = -38.469426;
    if(this.entrega != null &&  this.entrega != []){
      let latInicial = this.entrega.location.position.lat;
      let lngInicial = this.entrega.location.position.lng;
    }

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: latInicial,
           lng: lngInicial
         },
         zoom: 12,
         tilt: 30
       }
    };
  
    this.map = GoogleMaps.create('map_second',mapOptions);
  
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
      console.log('SecondPage: map is ready...');
    });

     
    let htmlInfoWindow = new HtmlInfoWindow();

    let frame: HTMLElement = document.createElement('div');
    frame.innerHTML = [
      '<div style="width: 250px; max-height:300px;">',
      '<h5>' + this.entrega.devedor + '</h5><br>',
      ' <span><b>Tentativa: </b>' + this.entrega.tentativa + '</span><br>',
      ' <span><b>Endereço: </b>' + this.entrega.endereco + '</span><br>',
      ' <span><b>Protocolo: </b>' + this.entrega.protocolo + '</span><br>',
      '<a onclick="window.open(this.href, \'_system\'); return false;" style="color: blue;" href="https://www.google.com/maps/dir/?api=1&origin=' + this.autenticacaoProvider.latitudeAtual + ',' + this.autenticacaoProvider.longitiudeAtual + '&destination=' + this.entrega.location.position.lat + ',' + this.entrega.location.position.lng + '">Iniciar trajeto</a></div>'
    ].join("");

    /*frame.getElementsByTagName("img")[0].addEventListener("click", () => {
      htmlInfoWindow.setBackgroundColor('red');
    });*/

    let corPin = "green";

    if (this.entrega.idTentativaEntrega == 2) {
      corPin = "yellow"
    } else if (this.entrega.idTentativaEntrega == 3) {
      corPin = "red"
    }

    let options: MarkerOptions = {
      icon: corPin,
      position: { lat: this.entrega.location.position.lat, lng: this.entrega.location.position.lng },
      draggable: true,
      disableAutoPan: true
    };

    /*htmlInfoWindow.setContent(frame, {
      width: "100px",
      height: "100px"
    });*/

    htmlInfoWindow.setContent(frame);


    let marker: Marker = this.map.addMarkerSync(options);

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      htmlInfoWindow.open(marker);
    });
  }

}
