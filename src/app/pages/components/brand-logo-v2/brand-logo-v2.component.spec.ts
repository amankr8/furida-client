import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandLogoV2Component } from './brand-logo-v2.component';

describe('BrandLogoV2Component', () => {
  let component: BrandLogoV2Component;
  let fixture: ComponentFixture<BrandLogoV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandLogoV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandLogoV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
