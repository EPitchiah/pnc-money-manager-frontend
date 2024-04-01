import { TestBed } from '@angular/core/testing';

import { ParentalControl } from './parental-control.service';

describe('ParentalControlService', () => {
  let service: ParentalControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentalControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
