import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoIntimacaoPage } from './historico-intimacao';
import { BrMaskerModule } from 'brmasker-ionic-3';
@NgModule({
  declarations: [
    HistoricoIntimacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoIntimacaoPage),
    BrMaskerModule
  ],
})
export class HistoricoIntimacaoPageModule {}
