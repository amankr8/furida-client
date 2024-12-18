import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerBottomComponent } from './banner-bottom.component';

describe('BannerBottomComponent', () => {
  let component: BannerBottomComponent;
  let fixture: ComponentFixture<BannerBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerBottomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
