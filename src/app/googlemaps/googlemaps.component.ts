import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NutrientDialogTemplate} from '../nutrient-dialog/nutrient-dialog.component';
declare var google: any;
let map: any = '';
let infowindow: any = '';
@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
})
export class GooglemapsComponent implements AfterViewInit {
  @ViewChild('mapObj', {static: false})
    mapObject: ElementRef;
  latitude = 40.7128;
  longitude = -73.935242;
  zoom =  10;
  constructor( public dialogRef: MatDialogRef<GooglemapsComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngAfterViewInit() {
    this.initMap(this.data.title);
  }
  private setCurrentPosition() {
    return new Promise((res) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude || 40.7128;
          this.longitude = position.coords.longitude || -73.935242;
          this.zoom = 10  ;
          res();
        }, (err) => {
            console.log(err);
            res();
        },{
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      }
    });
  }
  initMap(title) {
    this.setCurrentPosition().then(() => {
    const location = {lat: this.latitude, lng: this.longitude};
    map = '';
    infowindow = '';
    map = new google.maps.Map(this.mapObject.nativeElement, {
      center: location,
      zoom: this.zoom
    });

    infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    service.textSearch({
      location: location,
      radius: 50,
      query: title
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
        }
      }
    });
    });
  }

  createMarker(place) {
    const placeLoc = place.geometry.location;
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      const a = document.createElement('div');
      a.style.width = '10em';
      const image = document.createElement('img');
      image.src = place.photos[0].raw_reference && place.photos[0].raw_reference.fife_url;
      image.width = 50;
      image.height = 50;
      const pName = document.createElement('p');
      const pAddress = document.createElement('p');
      const pStatus = document.createElement('p');
      pName.innerHTML = place.name;
      pAddress.innerHTML = place.formatted_address;
      pStatus.innerHTML = place.opening_hours.open_now ? 'Open now' : 'Closed';
      pStatus.style.color = place.opening_hours.open_now ? 'green' : 'red';
      a.appendChild(pName);
      a.appendChild(pAddress);
      a.appendChild(pStatus);
      infowindow.setContent(a);
      infowindow.open(map, this);
    });
  }
}
