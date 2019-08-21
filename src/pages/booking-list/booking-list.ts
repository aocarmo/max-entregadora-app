import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HotelService} from "../../providers/hotel-service";
import {HotelDetailPage} from "../hotel-detail/hotel-detail";

@IonicPage({
  name: 'page-booking-list',
  segment: 'booking-list'
})

@Component({
    selector: 'page-booking-list',
    templateUrl: 'booking-list.html'
})
export class BookingListPage {

    bookings: Array<any> = [];

    constructor(public navCtrl: NavController, public service: HotelService) {
        this.getBookings();
        // console.log(this.favorites);
    }

    itemTapped(booking) {
        this.navCtrl.push(HotelDetailPage, booking);
    }

    getBookings() {
        this.service.getBookings()
            .then(data => { this.bookings = data; });
    }

}
