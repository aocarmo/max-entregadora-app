import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutHotelPage } from './checkout-hotel';

@NgModule({
  declarations: [
    CheckoutHotelPage
  ],
  imports: [
    IonicPageModule.forChild(CheckoutHotelPage)
  ],
  exports: [
    CheckoutHotelPage
  ]
})

export class CheckoutHotelPageModule { }
