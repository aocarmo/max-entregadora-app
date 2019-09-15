import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinhasEntregasListPage } from './minhas-entregas-list';

@NgModule({
  declarations: [
    MinhasEntregasListPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhasEntregasListPage),
  ],
})
export class MinhasEntregasListPageModule {}
