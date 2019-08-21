import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { HotelPage } from './hotel';

@NgModule({
  declarations: [
    HotelPage
  ],
  imports: [
    IonicPageModule.forChild(HotelPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    })
  ],
  exports: [
    HotelPage
  ]
})

export class HotelPageModule { }
