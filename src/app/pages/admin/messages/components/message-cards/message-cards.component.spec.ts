import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCardsComponent } from './message-cards.component';

describe('CardsComponent', () => {
  let component: MessageCardsComponent;
  let fixture: ComponentFixture<MessageCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
