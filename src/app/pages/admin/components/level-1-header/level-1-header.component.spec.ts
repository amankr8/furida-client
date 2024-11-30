import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level1HeaderComponent } from './level-1-header.component';

describe('Level1HeaderComponent', () => {
  let component: Level1HeaderComponent;
  let fixture: ComponentFixture<Level1HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Level1HeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Level1HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
