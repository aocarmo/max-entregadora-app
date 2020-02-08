import { CameraService } from './../providers/camera/camera-service';
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {CalendarModule} from "ion2-calendar";
import {AgmCoreModule} from '@agm/core';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';



import {ionBookingApp} from "./app.component";
import { AutenticacaoProvider } from '../providers/autenticacao/autenticacao';
import { FuncoesProvider } from '../providers/funcoes/funcoes';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GoogleMaps} from '@ionic-native/google-maps';
import { MapControllerProvider } from '../providers/map-controller/map-controller';
import { IntimacoesProvider } from '../providers/intimacoes/intimacoes';
import { PerfilProvider } from '../providers/perfil/perfil';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    ionBookingApp,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrMaskerModule,
    IonicModule.forRoot(
      ionBookingApp,
      {
        preloadModules: true,
        scrollPadding: false,
        scrollAssist: true,
        autoFocusAssist: false,
        backButtonText: 'Voltar'
      }
    ),
    IonicStorageModule.forRoot({
      name: '__ionBookingDB',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    }),
    CalendarModule,
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ionBookingApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AutenticacaoProvider,
    FuncoesProvider,
    Camera,
    CameraService,
    FilePath,
    File,    
    ActionSheet,
    Diagnostic,
    GoogleMaps,
    MapControllerProvider,
    IntimacoesProvider,
    PerfilProvider,
    Network,
    NetworkProvider,
    Geolocation,
    InAppBrowser
  ]
})

export class AppModule {
}
