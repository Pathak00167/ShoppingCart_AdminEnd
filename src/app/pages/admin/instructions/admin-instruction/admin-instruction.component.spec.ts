import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInstructionComponent } from './admin-instruction.component';

describe('AdminInstructionComponent', () => {
  let component: AdminInstructionComponent;
  let fixture: ComponentFixture<AdminInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInstructionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
