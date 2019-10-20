import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { HomePage } from './home';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { NotificationsPage } from '../notifications/notifications';

@NgModule({
  declarations: [
    HomePage,

  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    }),
    SuperTabsModule
  ],
  exports: [
    HomePage
  ]
})

export class HomePageModule { }
