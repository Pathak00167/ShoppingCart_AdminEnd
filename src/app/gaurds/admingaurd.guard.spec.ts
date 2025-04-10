import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { admingaurdGuard } from './admingaurd.guard';

describe('admingaurdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => admingaurdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
