import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { HotelDetailPage } from './hotel-detail';

@NgModule({
  declarations: [
    HotelDetailPage
  ],
  imports: [
    IonicPageModule.forChild(HotelDetailPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    })
  ],
  exports: [
    HotelDetailPage
  ]
})

export class HotelDetailPageModule { }
