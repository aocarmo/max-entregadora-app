import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheEntregaPage } from './detalhe-entrega';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    DetalheEntregaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheEntregaPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    }),
  ],
})
export class DetalheEntregaPageModule {}
