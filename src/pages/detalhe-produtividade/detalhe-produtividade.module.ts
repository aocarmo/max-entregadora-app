import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheProdutividadePage } from './detalhe-produtividade';

@NgModule({
  declarations: [
    DetalheProdutividadePage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheProdutividadePage),
  ],
})
export class DetalheProdutividadePageModule {}
