import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level0HeaderComponent } from './level-0-header.component';

describe('Level0HeaderComponent', () => {
  let component: Level0HeaderComponent;
  let fixture: ComponentFixture<Level0HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Level0HeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Level0HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
