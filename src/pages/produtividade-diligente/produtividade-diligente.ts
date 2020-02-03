import { Constantes } from './../../constantes/constantes';
import { NetworkProvider } from './../../providers/network/network';
import { ModalController } from 'ionic-angular';
import { IntimacaoPreBaixa } from './../../model/intimacaoPreBaixa.model';
import { FuncoesProvider } from './../../providers/funcoes/funcoes';
import { IntimacoesProvider } from './../../providers/intimacoes/intimacoes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProdutividadeDiligentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'page-produtividade-diligente',
  segment: 'produtividade-diligente'
})


@Component({
  selector: 'page-produtividade-diligente',
  templateUrl: 'produtividade-diligente.html',
})
export class ProdutividadeDiligentePage {
 // search condition
 public search: any = { 
  dtInicio: new Date().toISOString(),
  dtFim: new Date().toISOString()
};

public listaPrebaixas : IntimacaoPreBaixa[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public IntimacoesProvider: IntimacoesProvider, public FuncoesProvider: FuncoesProvider,
              public modalCtrl: ModalController,
              public networkProvider: NetworkProvider) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutividadeDiligentePage');
  }

  pesquisar(){
    if(this.networkProvider.previousStatus == 0){
      let load = this.FuncoesProvider.showLoading("Aguarde...");
      this.IntimacoesProvider.ObterPreBaixas('31/10/2019','31/10/2019').
        then((data: any) =>{
          load.dismiss();
          if(data.ok && data.retorno.length == 0){
            this.FuncoesProvider.showAlert("Não foram encontrados registros para as datas informadas.");
          }else if(data.ok && data.retorno.length > 0){
            this.listaPrebaixas = data.retorno;
          }else{
            this.FuncoesProvider.showAlert(data.msg);
          }
        }).catch((err:any)=>{
          load.dismiss();
        });
    }else{
      this.FuncoesProvider.showAlert(Constantes.INTERNET_INDISPONIVEL);
    }
  
    
    
  }


  formataData (dataCompleta: string) :string{

    let data = dataCompleta.split('T')[0].split('-');
    return data[2] + "/" + data[1] + "/" +data[0];
  }


  abrirDetalhe(prebaixa: any){
    this.navCtrl.push('page-detalhe-produtividade',{'prebaixa': prebaixa});
  }


}
