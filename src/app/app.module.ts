import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AngularFireAuth} from "angularfire2/auth";

import { Geolocation } from '@ionic-native/geolocation';

import { Device } from '@ionic-native/device';

import { AuthProvider } from '../providers/auth/auth';
import { GeolocationsProvider } from '../providers/geolocations/geolocations';

export const firebaseConfig = {
  apiKey: "AIzaSyAKg3WHSCJTPBAetEaNMFDy8eWT2iJDRIM",
  authDomain: "parkswap-538c0.firebaseapp.com",
  databaseURL: "https://parkswap-538c0.firebaseio.com",
  projectId: "parkswap-538c0",
  storageBucket: "parkswap-538c0.appspot.com",
  messagingSenderId: "503596382600"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    Geolocation,
    Device,
    GeolocationsProvider
  ]
})
export class AppModule {}
