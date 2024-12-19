import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProjectsComponent } from './projects.component';

describe('DocumentsComponent', () => {
  let component: MainProjectsComponent;
  let fixture: ComponentFixture<MainProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainProjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
