import { TestBed } from '@angular/core/testing';

import { AdminWorkspaceService } from './admin-workspace.service';

describe('AdminWorkspaceService', () => {
  let service: AdminWorkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminWorkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
