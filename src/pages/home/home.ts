import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams, MenuController, ModalController, PopoverController} from "ionic-angular";
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import {NotificationsPage} from "../notifications/notifications";

import {HotelService} from "../../providers/hotel-service";

import { AutenticacaoProvider } from "../../providers/autenticacao/autenticacao";

@IonicPage({
  name: 'page-home',
  segment: 'home',
  priority: 'high'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  dDate: Date = new Date();
  searchQuery: string = '';
  items: string[];
  showItems: boolean = false;
  lat: number = -22.9068;
  lng: number = -43.1729;
  zoom: number = 12;


  public childs: any;

  public hotellocation: string;

  // list of hotels
  public hotels: any;

  // search conditions
  public checkin = {
    name: "Check-in",
    date: new Date().toLocaleString().split(',')[0]
  }

  public checkout = {
    name: "Check-out",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleString().split(',')[0]
  }

  constructor(public nav: NavController, public navParams: NavParams, 
              public menuCtrl: MenuController, public modalCtrl: ModalController, 
              public popoverCtrl: PopoverController, public hotelService: HotelService,public autenticacaoProvider: AutenticacaoProvider) {
    // set sample data
    this.menuCtrl.swipeEnable(true, 'authenticated');
    this.menuCtrl.enable(true);
    this.hotels = hotelService.getAll();
    
  }

  ionViewDidLoad() {
    // init map
    // this.initializeMap();
    if(this.autenticacaoProvider.authenticated()){
      console.log('logou');
      
    }else{
      console.log('hhahahadeslogou');
    }
  
  }

  openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Range Date'
    };

    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      if (date !== null) {
        this.checkin.date = new Date(new Date(date.from.time)).toLocaleString().split(',')[0]
        this.checkout.date = new Date(new Date(date.to.time)).toLocaleString().split(',')[0]
      }
    });
  }

  // initializeMap() {
  //   let latLng = new google.maps.LatLng(this.hotels[0].location.lat, this.hotels[0].location.lon);

  //   let mapOptions = {
  //     center: latLng,
  //     zoom: 11,
  //     scrollwheel: false,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     mapTypeControl: false,
  //     zoomControl: false,
  //     streetViewControl: false
  //   }

  //   this.map = new google.maps.Map(document.getElementById("home-map"), mapOptions);

  //   // add markers to map by hotel
  //   for (let i = 0; i < this.hotels.length; i++) {
  //     let hotel = this.hotels[i];
  //     new google.maps.Marker({
  //       map: this.map,
  //       animation: google.maps.Animation.DROP,
  //       position: new google.maps.LatLng(hotel.location.lat, hotel.location.lon)
  //     });
  //   }

  //   // refresh map
  //   setTimeout(() => {
  //     google.maps.event.trigger(this.map, 'resize');
  //   }, 300);
  // }

  initializeItems() {
    this.items = [
      'La Belle Place - Rio de Janeiro',
      'Marshall Hotel - Marshall Islands',
      'Maksoud Plaza - São Paulo',
      'Hotel Copacabana - Rio de Janeiro',
      'Pousada Marés do amanhã - Maragogi'
    ];
  }

  itemSelected(item: string) {
    this.hotellocation = item;
    this.showItems = false;
  }

  childrenArr(chil) {
    let child = Number(chil);
    this.childs = Array(child).fill(0).map((v,i) => i);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.showItems = true;
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.showItems = false;
    }
  }

  // view hotel detail
  viewHotel(hotel) {
    // console.log(hotel.id)
    this.nav.push('page-hotel-detail', {
      'id': hotel.id
    });
  }

  // view all hotels
  viewHotels() {
    this.nav.push('page-hotel');
  }

  // go to search car page
  searchCar() {
    this.nav.push('page-search-cars');
  }

  // go to search trip page
  searchTrip() {
    this.nav.push('page-search-trips');
  }

  // to go account page
  goToAccount() {
    this.nav.push('page-account');
  }

  presentNotifications(myEvent) {
    // console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//
