import { TestBed } from '@angular/core/testing';

import { ManageProductsService } from './manage-products.service';

describe('ManageProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageProductsService = TestBed.get(ManageProductsService);
    expect(service).toBeTruthy();
  });
});
