import { Component } from '@angular/core';
import { MessageCardsComponent } from './components/message-cards/message-cards.component';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    MessageCardsComponent,
    NavToolbarComponent,
    CommonModule,
    MatTabsModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  headerText: string = 'Inbox';
  buttonText: string = 'Archive Inbox';
  childLevelLink: string = 'read-messages';
}
