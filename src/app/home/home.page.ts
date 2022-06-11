import { Component, ElementRef, ViewChild, OnInit, HostListener } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { HolidaysService } from '../service/holidays.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public holidaysService: HolidaysService) {}

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  holidays = [];

  ngAfterViewInit(){
    this.createMap();
  }

  addMarker(lat, lng) {
    this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng
      }
    });
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: 54.6,
          lng: 18.55,
        },
        zoom: 3,
      },
    });


    this.newMap.setOnMapClickListener((e) => this.addMarker(e.latitude, e.longitude));
    this.newMap.setOnMarkerClickListener((e) => this.holidaysService.getHolidays(e.latitude, e.longitude)
      .then((json) => { this.holidays = json }));
  }

}
