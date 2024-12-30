import { Component } from '@angular/core';
import { CardsComponent } from './components/cards/cards.component';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardsComponent, NavToolbarComponent, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  headerText: string = 'Inbox';
  buttonText: string = 'Archive Inbox';
  childLevelLink: string = 'read-messages';
}
