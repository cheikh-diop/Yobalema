import { TestBed, inject } from '@angular/core/testing';

import { PaginationserviceService } from './paginationservice.service';

describe('PaginationserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationserviceService]
    });
  });

  it('should be created', inject([PaginationserviceService], (service: PaginationserviceService) => {
    expect(service).toBeTruthy();
  }));
});
