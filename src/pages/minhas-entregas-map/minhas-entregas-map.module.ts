import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinhasEntregasMapPage } from './minhas-entregas-map';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MinhasEntregasMapPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhasEntregasMapPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    }),
  ],
})
export class MinhasEntregasMapPageModule {}
