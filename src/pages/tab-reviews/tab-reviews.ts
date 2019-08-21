import {Component} from "@angular/core";
import {IonicPage, NavController, App} from "ionic-angular";
import {HotelService} from "../../providers/hotel-service";

@IonicPage({
  name: 'tabs-reviews'
})

@Component({
  selector: 'page-tab-reviews',
  templateUrl: 'tab-reviews.html'
})
export class TabReviewsPage {
  // hotel info
  public hotel: any;

  // list of reviews
  public reviews = [];

  constructor(public nav: NavController, public hotelService: HotelService, public app:App) {
    // set hotel data
    this.hotel = hotelService.getItem(1);

    // filter reviews
    let tabId = this.nav.id;
    for (let i = 0; i < this.hotel.reviews.length; i++) {
      // if is recent tab
      if (tabId == 't0-0') {
        this.reviews.push(this.hotel.reviews[i]);
      } else if (tabId == 't0-1') { // favorable tab
        if (this.hotel.reviews[i].rating > 3) {
          this.reviews.push(this.hotel.reviews[i]);
        }
      } else { // critical tab
        if (this.hotel.reviews[i].rating <= 3) {
          this.reviews.push(this.hotel.reviews[i]);
        }
      }
    }
  }

  // make array with range is n
  range(n) {
    return new Array(n);
  }

  // dismiss
  dismiss() {
    this.app.getRootNav().pop();
  }
}
