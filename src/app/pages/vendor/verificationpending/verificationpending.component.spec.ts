import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationpendingComponent } from './verificationpending.component';

describe('VerificationpendingComponent', () => {
  let component: VerificationpendingComponent;
  let fixture: ComponentFixture<VerificationpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationpendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
