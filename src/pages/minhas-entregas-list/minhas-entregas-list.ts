import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';

import {ENTREGAS} from "../../mocks/mock-entregas"; // So para exemplos
import _ from 'lodash';

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


 
  constructor(public navCtrl: NavController, public navParams: NavParams, private superTabsCtrl: SuperTabsController) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
    this.queryText = "";
    this.entregas = ENTREGAS;
    this.todasEntregas = this.entregas;
    
  }


  filterCidade(cid: any){
    let val = cid.target.value;

    if(val  && val.trim() != ''){
      this.entregas = _.values(this.todasEntregas);
      this.entregas = this.entregas.filter((entrega)=>{
        return (
          entrega.devedor.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          entrega.documento.toLowerCase().indexOf(val.toLowerCase()) > -1 )
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
}