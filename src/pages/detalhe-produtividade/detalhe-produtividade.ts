import { FuncoesProvider } from './../../providers/funcoes/funcoes';
import { IntimacaoPreBaixa } from './../../model/intimacaoPreBaixa.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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
import { ImagemModalPage } from '../imagem-modal/imagem-modal';

/**
 * Generated class for the DetalheProdutividadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage({
  name: 'page-detalhe-produtividade',
  segment: 'detalhe-produtividade'
})


@Component({
  selector: 'page-detalhe-produtividade',
  templateUrl: 'detalhe-produtividade.html',
})
export class DetalheProdutividadePage {

  public lista : IntimacaoPreBaixa;
  map: GoogleMap;
  mapReady: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public autenticacaoProvider: AutenticacaoProvider, public FuncoesProvider: FuncoesProvider,  public modalCtrl: ModalController) {
    this.lista = this.navParams.get('prebaixa');
  }

  ionViewDidLoad() {
    if(this.lista.dadosPreBaixa.latitudePreBaixa != null && this.lista.dadosPreBaixa.longitudePreBaixa != null){
      this.loadMap();
    }
    
  }


  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.lista.dadosPreBaixa.latitudePreBaixa,
           lng: this.lista.dadosPreBaixa.longitudePreBaixa
         },
         zoom: 12,
         tilt: 30
       }
    };
  
    this.map = GoogleMaps.create('map_three',mapOptions);
  
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
     
    });

     
    let htmlInfoWindow = new HtmlInfoWindow();

    let frame: HTMLElement = document.createElement('div');
    frame.innerHTML = [
      '<div style="width: 250px; max-height:300px;">',
      '<h5>' + this.lista.dadosIntimacao.nomeDestinatario + '</h5><br>',
      ' <span><b>Tentativa: </b>' + this.lista.dadosPreBaixa.nomeTentativaEntrega + ' Tentativa</span><br>',
      ' <span><b>Endereço: </b>' + this.lista.dadosIntimacao.enderecoDestinatario + '</span><br>',
      ' <span><b>Protocolo: </b>' +  this.lista.dadosIntimacao.numeroProtocolo + '</span><br>',
      '<a onclick="window.open(this.href, \'_system\'); return false;" style="color: blue;" href="https://www.google.com/maps/dir/?api=1&origin=' + this.autenticacaoProvider.latitudeAtual + ',' + this.autenticacaoProvider.longitiudeAtual + '&destination=' + this.lista.dadosPreBaixa.latitudePreBaixa + ',' + this.lista.dadosPreBaixa.longitudePreBaixa + '">Iniciar trajeto</a></div>'
    ].join("");

    /*frame.getElementsByTagName("img")[0].addEventListener("click", () => {
      htmlInfoWindow.setBackgroundColor('red');
    });*/

    let corPin = "green";

    if (this.lista.dadosPreBaixa.nomeTentativaEntrega == '2ª') {
      corPin = "yellow"
    } else if (this.lista.dadosPreBaixa.nomeTentativaEntrega == '3ª') {
      corPin = "red"
    }

    let options: MarkerOptions = {
      icon: corPin,
      position: { lat: this.lista.dadosPreBaixa.latitudePreBaixa, lng: this.lista.dadosPreBaixa.longitudePreBaixa},
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

  public abrirImagem(foto: string) {
    let loading = this.FuncoesProvider.showLoading("");
    var data = { fotoURL: foto };
    var modalPage = this.modalCtrl.create(ImagemModalPage, data);
    loading.dismiss();
    modalPage.present();
  }


}
