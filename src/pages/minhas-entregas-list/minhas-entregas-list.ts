import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';

import {ENTREGAS} from "../../mocks/mock-entregas"; // So para exemplos
import _ from 'lodash';
import { IntimacoesProvider } from '../../providers/intimacoes/intimacoes';
import { FuncoesProvider } from '../../providers/funcoes/funcoes';
import { Constantes } from '../../constantes/constantes';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MinhasEntregasListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-minhas-entregas-list',
  segment: 'list',
  priority: 'high'
})
@Component({
  selector: 'page-minhas-entregas-list',
  templateUrl: 'minhas-entregas-list.html',
})
export class MinhasEntregasListPage {

  public entregas: any;
  rootNavCtrl: NavController;
  queryText: string;
  todasEntregas: any;


 
  constructor(public navCtrl: NavController, public navParams: NavParams, private superTabsCtrl: SuperTabsController,
              public intimacoesProvider: IntimacoesProvider,
              public funcoes: FuncoesProvider,
              public storage: Storage) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
    this.queryText = "";
    this.entregas = ENTREGAS;
    this.todasEntregas = this.entregas;
    
  }


  
ionViewWillEnter() {
  this.ObterListaIntimacoes().then((data:any)=>{
  
    
  });
//
}

  filterCidade(cid: any){
    let val = cid.target.value;

    if(val  && val.trim() != ''){
      this.entregas = _.values(this.todasEntregas);
      this.entregas = this.entregas.filter((entrega)=>{
        return (
          entrega.devedor.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          entrega.documento.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
         // entrega.protocolo.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          entrega.endereco.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          entrega.dtLimite.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          entrega.dtProtocolo.toLowerCase().indexOf(val.toLowerCase()) > -1 
           )
      });
    }else{
      this.entregas = this.todasEntregas;
    }

  }
  verDetalhe(entrega:any){
    this.rootNavCtrl.push('page-detalhe-entrega',{'entrega': entrega }); 
  }
 
  goToDetails() {
    this.rootNavCtrl.push('NewsDetailsPage');
  }
 
  setBadge() {
    this.superTabsCtrl.setBadge('aboutTab', 9);
  }
 
  clearBadge() {
    this.superTabsCtrl.clearBadge('aboutTab');
  }
 
  jumpToAccount() {
    this.superTabsCtrl.slideTo(2);
  }
 
  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }
 
  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
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