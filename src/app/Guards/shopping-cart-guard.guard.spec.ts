import { TestBed, async, inject } from '@angular/core/testing';

import { ShoppingCartGuardGuard } from './shopping-cart-guard.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('ShoppingCartGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartGuardGuard],
      imports:[HttpClientModule,RouterModule.forRoot([])]
    });
  });

  it('should ...', inject([ShoppingCartGuardGuard], (guard: ShoppingCartGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
