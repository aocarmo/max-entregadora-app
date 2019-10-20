import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams, MenuController, ModalController, PopoverController, Platform} from "ionic-angular";
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import {NotificationsPage} from "../notifications/notifications";

import {HotelService} from "../../providers/hotel-service";

import { AutenticacaoProvider } from "../../providers/autenticacao/autenticacao";
import { ENTREGAS } from "../../mocks/mock-entregas";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { MapControllerProvider,MapInstance } from "../../providers/map-controller/map-controller";

//const mapId = 'HOME_MAP';
/**
 * Generated class for the MinhasEntregasMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'page-minhas-entregas-map',
  segment: 'map',
  priority: 'high'
})



@Component({
  selector: 'page-minhas-entregas-map',
  templateUrl: 'minhas-entregas-map.html',
})
export class MinhasEntregasMapPage {
 // private hMap: MapInstance;
  dDate: Date = new Date();
  searchQuery: string = '';
  items: string[];
  showItems: boolean = false;
  lat: number = -12.991814;
  lng: number = -38.469426;
  zoom: number = 12;
  public entregas: any;
  map_canvas: GoogleMap;

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
    public popoverCtrl: PopoverController, public hotelService: HotelService,public autenticacaoProvider: AutenticacaoProvider, private mapCtrl: MapControllerProvider,
    private platform: Platform,
    private googleMaps: GoogleMaps) {
// set sample data
this.menuCtrl.swipeEnable(true, 'authenticated');
this.menuCtrl.enable(true);
this.hotels = hotelService.getAll();
this.entregas = ENTREGAS;

}
/*
ionViewWillLeave() {
  this.hMap.hide();
}*/

ionViewDidLoad() {
  
  this.loadMap();
}
/*
ionViewDidEnter() {
 
  this.platform.ready().then(
      () => {
        this.hMap.show();
        //this.events.subscribe('MARKER.CLICK', this._handleMarkerClick);
      }
  );
}*/

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

loadMap() {

  // This code is necessary for browser
  Environment.setEnv({
    'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyB_6IGpyQsPTenu0afoaBM7csRPLbtryoo',
    'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyB_6IGpyQsPTenu0afoaBM7csRPLbtryoo'
  });

  let mapOptions: GoogleMapOptions = {
    camera: {
       target: {
         lat: -12.991814,
         lng:  -38.469426
       },
       zoom: 12,
       tilt: 30
     }
  };

  
  this.map_canvas = GoogleMaps.create('map_canvas',mapOptions);

}

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

