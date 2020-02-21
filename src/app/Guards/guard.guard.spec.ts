import { TestBed, async, inject } from '@angular/core/testing';

import { GuardGuard } from './guard.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('GuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardGuard],
      imports:[HttpClientModule,RouterModule.forRoot([])]
    });
  });

  it('should ...', inject([GuardGuard], (guard: GuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
