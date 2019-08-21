import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {CalendarModule} from 'ion2-calendar';
import {AgmCoreModule} from '@agm/core';

import {HotelService} from "../providers/hotel-service";
import {PlaceService} from "../providers/place-service";
import {ActivityService} from "../providers/activity-service";
import {CarService} from "../providers/car-service";
import {TripService} from "../providers/trip-service";
import {WeatherProvider} from '../providers/weather';
import {MessageService} from '../providers/message-service-mock';

import {ionBookingApp} from "./app.component";


@NgModule({
  declarations: [
    ionBookingApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(
      ionBookingApp,
      {
        preloadModules: true,
        iconMode: 'md',
        mode: 'md'
      }
    ),
    IonicStorageModule.forRoot({
      name: '__ionBookingDBPWA',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    }),
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ionBookingApp
  ],
  providers: [
    HotelService,
    PlaceService,
    ActivityService,
    CarService,
    TripService,
    CarService,
    TripService,
    MessageService,
    WeatherProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})

export class AppModule {
}
