import { TestBed, async, inject } from '@angular/core/testing';

import { ShoppingCartGuardGuard } from './shopping-cart-guard.guard';

describe('ShoppingCartGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartGuardGuard]
    });
  });

  it('should ...', inject([ShoppingCartGuardGuard], (guard: ShoppingCartGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
