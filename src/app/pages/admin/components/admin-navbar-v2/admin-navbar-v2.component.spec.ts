import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavbarV2Component } from './admin-navbar-v2.component';

describe('AdminNavbarV2Component', () => {
  let component: AdminNavbarV2Component;
  let fixture: ComponentFixture<AdminNavbarV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNavbarV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNavbarV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
