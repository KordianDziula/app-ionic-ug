import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  constructor() { }

  async getCountryCode(lat, lng){
    return fetch(`https://us1.locationiq.com/v1/reverse.php?key=${environment.locationApiKey}&lat=${lat}&lon=${lng}&format=json`)
    .then(response => response.json())
    .then(json => { return json.address.country_code });
  }

  async getHolidaysJSON(countryCode){
    return fetch(`https://calendarific.com/api/v2/holidays?&api_key=${environment.calendarApiKey}&country=${countryCode}&year=2022`)
    .then(response => response.json())
    .then(json => { return json });
  }

  async getHolidays(lat, lng){
    let countryCode = await this.getCountryCode(lat, lng);
    let holidaysJSON = await this.getHolidaysJSON(countryCode);

    let holidays = [];

    holidaysJSON.response.holidays.forEach(element => {
      holidays.push({
        "title": element.name,
        "description": element.description,
        "date": new Date(element.date.datetime.year, element.date.datetime.month, element.date.datetime.day).toLocaleDateString("en-US")
      })
    });
    
    return holidays;
  }
}
