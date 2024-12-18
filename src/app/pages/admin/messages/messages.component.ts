import { Component } from '@angular/core';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [Level1HeaderComponent, CardsComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  headerText: string = 'Inbox';
  buttonText: string = 'Archive Inbox';
  childLevelLink: string = 'read-messages';
}
