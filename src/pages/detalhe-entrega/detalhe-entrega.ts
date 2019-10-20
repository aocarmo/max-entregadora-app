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
  Environment
} from '@ionic-native/google-maps';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

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
  
    this.map = GoogleMaps.create('map_second',mapOptions);
  
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
      console.log('SecondPage: map is ready...');
    });
  }

}
