import { TestBed } from '@angular/core/testing';

import { ManageProductsService } from './manage-products.service';
import { HttpClientModule } from '@angular/common/http';

describe('ManageProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: ManageProductsService = TestBed.get(ManageProductsService);
    expect(service).toBeTruthy();
  });
});
