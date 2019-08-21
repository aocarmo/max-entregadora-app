import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams, LoadingController, ToastController} from "ionic-angular";
import {HotelService} from "../../providers/hotel-service";

@IonicPage({
  name: 'page-checkout-hotel',
  segment: 'checkout-hotel/:id'
})

@Component({
  selector: 'page-checkout-hotel',
  templateUrl: 'checkout-hotel.html'
})
export class CheckoutHotelPage {
  param: number;
  // hotel info
  public hotel: any;
  // room info
  public room: any;
  // number of nights
  public nights = 7;
  // number of guests
  public guests = 3;
  // date from
  public dateFrom = new Date();
  // date to
  public dateTo = new Date();

  public paymethods = 'creditcard';

  constructor(public nav: NavController, public hotelService: HotelService, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    // console.log(this.hotelService.getAll()[0])
    // console.log(this.navParams.data)
    // set sample data
    this.param = this.navParams.get('id');
    this.hotel = this.hotelService.getItem(this.param) ? this.hotelService.getItem(this.param) : this.hotelService.getAll()[0];
    this.room = this.hotel.rooms[0];
  }

  // process send button
  send() {
    // send booking info
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // show message
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profile-bg',
      message: 'Booking Success!',
      duration: 3000,
      position: 'bottom'
    });

    loader.present();

    this.hotelService.booking(this.hotel)
        .then(response => {
          setTimeout(() => {
            loader.dismiss();
            toast.present();
            // back to home page
            this.nav.setRoot('page-home');
          }, 3000)
        });
  }
}
