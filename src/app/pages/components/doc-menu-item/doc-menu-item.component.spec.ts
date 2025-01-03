import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocMenuItemComponent } from './doc-menu-item.component';

describe('DocMenuItemComponent', () => {
  let component: DocMenuItemComponent;
  let fixture: ComponentFixture<DocMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocMenuItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
