import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTextHeadComponent } from './display-text-head.component';

describe('DisplayTextHeadComponent', () => {
  let component: DisplayTextHeadComponent;
  let fixture: ComponentFixture<DisplayTextHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTextHeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayTextHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
