import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('map') mapElement: ElementRef;
	map: any;
	markers = [];

  constructor(public navCtrl: NavController, public platform: Platform, private geolocation: Geolocation, private device: Device) {
  	platform.ready().then(() => {
    	this.initMap();
  	});
  }

	initMap() {
	  this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
	    let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
	    console.log(resp.coords.latitude,resp.coords.longitude);
	    this.map = new google.maps.Map(this.mapElement.nativeElement, {
	      zoom: 15,
	      center: mylocation,
	      tilt: 30,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    });
	    
	  });
	  console.log(this.mapElement);
	  let watch = this.geolocation.watchPosition();
	  watch.subscribe((data) => {
	    this.deleteMarkers();
	    let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
	    let image = 'assets/imgs/car.png';
	    this.addMarker(updatelocation,image);
	    this.setMapOnAll(this.map);
	  });
	}


	addMarker(location, image) {
	  let marker = new google.maps.Marker({
	    position: location,
	    map: this.map,
	    icon: image
	  });
	  this.markers.push(marker);
	}

	setMapOnAll(map) {
	  for (var i = 0; i < this.markers.length; i++) {
	    this.markers[i].setMap(map);
	  }
	}

	clearMarkers() {
	  this.setMapOnAll(null);
	}

	deleteMarkers() {
	  this.clearMarkers();
	  this.markers = [];
	}

}
