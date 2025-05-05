import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendoraddressComponent } from './vendoraddress.component';

describe('VendoraddressComponent', () => {
  let component: VendoraddressComponent;
  let fixture: ComponentFixture<VendoraddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendoraddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendoraddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
