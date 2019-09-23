import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { countries, currencies, regions, languages, callingCountries } from 'country-data';
import { IonicSelectableComponent } from 'ionic-selectable';
import * as _ from "lodash";
declare var $: any;
class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  // ports: Port[];
  // port: Port;
  countries: any = [];
  amount;
  result;
  currency;

  constructor(public http: HttpClient) {}

  ngOnInit() {

    let lookup = require('country-data').lookup;
    console.log('all country==>', countries.all);
    _.forEach(countries.all, (country) => {
      this.countries.push({ code: country.currencies[0], name: country.name })
    })
  }
  
  /**
   * Get Country code by country
   * @param {Object} event 
   */
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
    return this.http.get('https://free.currconv.com/api/v7/convert?q=' + event.value.code + '_INR&compact=ultra&apiKey=5e7f2a7594733468f38c'
    ).subscribe((res: any) => {
      console.log('converted curruncy============>', res);
      this.result = res;
    })
  }

  /**
   * get ammount input value
   */
  getValue() {
    console.log("=", $('#amount').val());
    this.amount = $('#amount').val()
  }

  /**
   * currency convrted to selected country
   */
  currencyConvert() {
    console.log("{{{{{{{{{{{", this.result);
    for (var propName in this.result) {
      if (this.result.hasOwnProperty(propName)) {
        var propValue = this.result[propName];
        console.log(propValue);
        this.currency = propValue * this.amount;
        console.log("currency======>", this.currency);
      }
    }
  }

}
