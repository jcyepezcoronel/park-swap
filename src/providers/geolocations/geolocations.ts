import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

/*
  Generated class for the GeolocationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocationsProvider {

	public geolocation: any = [];
	private geoCollection: AngularFirestoreCollection<any>;

  constructor(public http: HttpClient, public firegeo: AngularFirestore) {
    console.log('Hello GeolocationsProvider Provider');
    this.geoCollection = firegeo.collection<any>('geolocations');
  }

  updateGeolocation(uuid, lat, lng): any {
    if(localStorage.getItem('mykey')) {

		return this.geoCollection.doc(localStorage.getItem('mykey')).set({
			uuid: uuid,
			latitude: lat,
			longitude: lng
		});	

	} else {
		localStorage.setItem('mykey', uuid);

		return this.geoCollection.add({
			uuid: uuid,
		  	latitude: lat,
		  	longitude: lng
		});	
	}
  }
}
