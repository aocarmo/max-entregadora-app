import { Intimacao } from './../../model/intimacao.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HistoricoIntimacao } from '../../model/historicoIntimacao.model';
import { FuncoesProvider } from './../../providers/funcoes/funcoes';
import { ImagemModalPage } from '../imagem-modal/imagem-modal';

/**
 * Generated class for the DetalheHistoricoIntimacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-detalhe-historico-intimacao',
  segment: 'detalhe-historico-intimacao',

})
@Component({
  selector: 'page-detalhe-historico-intimacao',
  templateUrl: 'detalhe-historico-intimacao.html',
})
export class DetalheHistoricoIntimacaoPage {

  public dadosIntimacao : any;
  public historicoIntimacao : HistoricoIntimacao = new HistoricoIntimacao();

  constructor(public navCtrl: NavController, public navParams: NavParams, public FuncoesProvider: FuncoesProvider, public modalCtrl: ModalController) {
    this.dadosIntimacao = this.navParams.get('dadosIntimacao');
    this.historicoIntimacao = this.navParams.get('historicoIntimacao');
    console.log(JSON.stringify(this.historicoIntimacao));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheHistoricoIntimacaoPage');
  }

  public abrirImagem(foto: string) {
    let loading = this.FuncoesProvider.showLoading("");
    var data = { fotoURL: foto };
    var modalPage = this.modalCtrl.create(ImagemModalPage, data);
    loading.dismiss();
    modalPage.present();
  }


}
