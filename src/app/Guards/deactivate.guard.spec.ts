import { TestBed, async, inject } from '@angular/core/testing';

import { DeactivateGuard } from './deactivate.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('DeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeactivateGuard],
      imports:[HttpClientModule,RouterModule.forRoot([])]
    });
  });

  it('should ...', inject([DeactivateGuard], (guard: DeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
