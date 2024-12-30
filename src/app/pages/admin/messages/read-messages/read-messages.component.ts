import { Component } from '@angular/core';
import { CardsComponent } from '../components/cards/cards.component';
import { NavToolbarComponent } from '../../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-messages',
  standalone: true,
  imports: [CardsComponent, NavToolbarComponent, CommonModule],
  templateUrl: './read-messages.component.html',
  styleUrl: './read-messages.component.scss',
})
export class ReadMessagesComponent {
  headerText: string = 'Archive Inbox';
}
