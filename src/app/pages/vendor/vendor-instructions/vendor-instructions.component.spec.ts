import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInstructionsComponent } from './vendor-instructions.component';

describe('VendorInstructionsComponent', () => {
  let component: VendorInstructionsComponent;
  let fixture: ComponentFixture<VendorInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
