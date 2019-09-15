import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
 public entrega : any;
 lat: number = -12.991814;
  lng: number = -38.469426;
  zoom: number = 20;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.entrega = this.navParams.get('entrega');
    console.log(JSON.stringify(this.entrega));
    
  }

  registrarPreBaixa(entrega: any){
    this.navCtrl.push('page-pre-baixa',{'entrega': this.entrega});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheEntregaPage');
  }

}
