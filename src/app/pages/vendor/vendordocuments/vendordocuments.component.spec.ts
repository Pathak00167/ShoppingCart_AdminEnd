import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendordocumentsComponent } from './vendordocuments.component';

describe('VendordocumentsComponent', () => {
  let component: VendordocumentsComponent;
  let fixture: ComponentFixture<VendordocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendordocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendordocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
