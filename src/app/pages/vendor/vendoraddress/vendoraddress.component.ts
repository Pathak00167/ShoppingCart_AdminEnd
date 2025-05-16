import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country, State, City } from 'country-state-city';
import { FormsModule,ReactiveFormsModule,FormGroup,Validators } from '@angular/forms';
import { VendorService } from '../../../../services/vendor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendoraddress',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './vendoraddress.component.html',
})
export class VendoraddressComponent {
countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
selectedCity = '';
address = '';
postcode = '';
selectedCountryCode: string = '';
selectedStateCode: string = '';

  constructor(private service:VendorService, private toastr:ToastrService, private router:Router )
  {
  }

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

  submitAddress(){debugger
if (this.address == null) {
      alert('Address Can nott be null');
      return;
    }

var vendorId =  this.service.getUserIdFromToken()
if(vendorId == null)
{
  
}
    const payload = {
      vendorId: vendorId,
      address: this.address,  // (you should have the email available in component)
      country: this.selectedCountryCode,
      state: this.selectedStateCode,
      city: this.selectedCity,
      pincode:this.postcode
    };
    this.service.VendorAddressInfo(payload).subscribe(response => {
      console.log('Upload successful:', response);
      this.router.navigate(['vendor-documents']);
      // Handle success (e.g., navigate to another page or show a success message)
    }, error => {
      console.error('Upload failed:', error);
      // Handle error (e.g., show an error message)
    });
;
    
  }
}
