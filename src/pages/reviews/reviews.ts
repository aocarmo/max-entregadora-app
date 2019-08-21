import {Component} from "@angular/core";
import {IonicPage, NavController} from "ionic-angular";
import {HotelService} from "../../providers/hotel-service";

@IonicPage({
  name: 'page-reviews'
}
})

@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html'
})

export class ReviewsPage {
  // tabs
  public recent: any;
  public favorable: any;
  public critical: any;

  // hotel info
  public hotel: any;

  constructor(public nav: NavController, public hotelService: HotelService) {
    // set tabs
    this.recent = 'tabs-reviews';
    this.favorable = 'tabs-reviews';
    this.critical = 'tabs-reviews';

    // set hotel data
    this.hotel = hotelService.getItem(1);
  }
}
