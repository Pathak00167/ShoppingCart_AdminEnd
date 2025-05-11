import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country, State, City } from 'country-state-city';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendoraddress',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './vendoraddress.component.html',
})
export class VendoraddressComponent {
countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  
selectedCity = '';
address = '';
postcode = '';
addressProof = '';

  selectedCountryCode: string = '';
  selectedStateCode: string = '';

  ngOnInit() {
    this.countries = Country.getAllCountries();
  }

  onCountryChange(countryCode: string) {
    this.selectedCountryCode = countryCode;
    this.states = State.getStatesOfCountry(countryCode);
    this.cities = []; // Reset cities when country changes
  }

  onStateChange(stateCode: string) {
    this.selectedStateCode = stateCode;
    this.cities = City.getCitiesOfState(this.selectedCountryCode, stateCode);
  }
}
