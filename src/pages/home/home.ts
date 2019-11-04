import { FuncoesProvider } from './../../providers/funcoes/funcoes';
import { IntimacoesProvider } from './../../providers/intimacoes/intimacoes';
import { Intimacao } from './../../model/intimacao.model';
import { Usuario } from './../../model/usuario.model';
import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NotificationsPage } from '../notifications/notifications';

@IonicPage({
  name: 'page-home',
  segment: 'home',
  priority: 'high'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  public usuario: Usuario;
  public intimacoes: Intimacao[] = [];
  public  pages = [
    { pageName: 'page-minhas-entregas-map', title: 'Mapa', icon: 'map', id: 'newsTab', params: { "usuario": this.usuario} },
    { pageName: 'page-minhas-entregas-list', title: 'Entregas', icon: 'mail', id: 'aboutTab', params: { "usuario": this.usuario } }
  ]; 

  selectedTab = 0;

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public intimacoesProvider: IntimacoesProvider,
    public funcoes: FuncoesProvider,
    public zone: NgZone) {

    this.usuario = this.navParams.get('usuario');

  }


  onTabSelect(ev: any) {
    if (ev.index === 2) {
      let alert = this.alertCtrl.create({
        title: 'Secret Page',
        message: 'Are you sure you want to access that page?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              this.superTabs.slideTo(this.selectedTab);
            }
          }, {
            text: 'Yes',
            handler: () => {
              this.selectedTab = ev.index;
            }
          }
        ]
      });
      alert.present();
    } else {
      this.selectedTab = ev.index;
      this.superTabs.clearBadge(this.pages[ev.index].id);
    }
  }

  presentNotifications(myEvent) {
    // console.log(myEvent);
    let popover = this.popoverCtrl.create('page-notifications');
    popover.present({
      ev: myEvent
    });
  }




}