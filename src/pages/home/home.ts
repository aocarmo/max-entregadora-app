import { Component, ViewChild } from '@angular/core';
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
 
  pages = [
    { pageName: 'page-minhas-entregas-map', title: 'Mapa', icon: 'map', id: 'newsTab'},
    { pageName: 'page-minhas-entregas-list', title: 'Entregas', icon: 'mail', id: 'aboutTab'}
  ];
 
  selectedTab = 0;
 
  @ViewChild(SuperTabs) superTabs: SuperTabs;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,  public popoverCtrl: PopoverController) { }
 
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