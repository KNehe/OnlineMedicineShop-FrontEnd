import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { MatDialogModule } from '@angular/material';
import { AppModule } from '../app.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('SharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[AppModule],
    imports:[MatDialogModule,HttpClientModule, RouterModule.forRoot([])]
  }));

  it('should be created', () => {
    const service: SharedService = TestBed.get(SharedService);
    expect(service).toBeTruthy();
  });
});
