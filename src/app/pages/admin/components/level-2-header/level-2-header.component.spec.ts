import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2HeaderComponent } from './level-2-header.component';

describe('Level2HeaderComponent', () => {
  let component: Level2HeaderComponent;
  let fixture: ComponentFixture<Level2HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Level2HeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Level2HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
