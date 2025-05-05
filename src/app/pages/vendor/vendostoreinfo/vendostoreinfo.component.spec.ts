import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendostoreinfoComponent } from './vendostoreinfo.component';

describe('VendostoreinfoComponent', () => {
  let component: VendostoreinfoComponent;
  let fixture: ComponentFixture<VendostoreinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendostoreinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendostoreinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
