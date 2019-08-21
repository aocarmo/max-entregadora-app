import {Component, ViewChild} from "@angular/core";
import {IonicPage, NavController, NavParams, Platform, ToastController, Content} from "ionic-angular";
import {HotelService} from "../../providers/hotel-service";

@IonicPage({
  name: 'page-hotel-detail',
  segment: 'hotel-detail/:id'
})

@Component({
  selector: 'page-hotel-detail',
  templateUrl: 'hotel-detail.html'
})
export class HotelDetailPage {
  @ViewChild(Content) content: Content;
  param: number;
  // hotel info
  public hotel: any;
  //
  public arr: any = Array;

  constructor(public nav: NavController, public navParams: NavParams, public hotelService: HotelService, public platform: Platform, public toastCtrl: ToastController) {
    // set sample data
    this.param = this.navParams.get('id');
    // console.log(this.param);
    // this.hotel = hotelService.getItem(1);
    this.hotel = this.hotelService.getItem(this.param) ? this.hotelService.getItem(this.param) : this.hotelService.getAll()[0];
  }

  ionViewDidLoad() {
  }

  scrollTo(element: string) {
    let elem = document.getElementById(element);
    let box = elem.getBoundingClientRect();

    let body = document.body;
    let docEl = document.documentElement;

    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let clientTop = docEl.clientTop || body.clientTop || 0;
    let top  = box.top +  scrollTop - clientTop;
    let cDim = this.content.getContentDimensions();

    let scrollOffset = Math.round(top) + cDim.scrollTop - cDim.contentTop;

    this.content.scrollTo(0, scrollOffset, 500);
  }

  // view a room
  viewRoom(room) {
    for (let i = 0; i < this.hotel.rooms.length; i++) {
      this.hotel.rooms[i].active = false;
    }

    room.active = true;
  }

  // go to reviews page
  viewReviews() {
    this.nav.push('page-reviews');
  }

  // go to checkout page
  checkout(hotel) {
    this.nav.push('page-checkout-hotel', {
      'id': hotel.id
    });
  }

  favorite(hotel) {
      this.hotelService.favorite(hotel)
          .then(property => {
              let toast = this.toastCtrl.create({
                  message: 'Hotel added to your favorites',
                  cssClass: 'mytoast',
                  duration: 2000
              });
              toast.present(toast);
          });
  }

}
