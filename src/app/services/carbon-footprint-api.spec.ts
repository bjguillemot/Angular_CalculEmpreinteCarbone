import { TestBed } from '@angular/core/testing';

import { CarbonFootprintAPI } from './carbon-footprint-api';

describe('CarbonFootprintAPI', () => {
  let service: CarbonFootprintAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarbonFootprintAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
