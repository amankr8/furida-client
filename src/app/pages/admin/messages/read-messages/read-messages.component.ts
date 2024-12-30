import { Component } from '@angular/core';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';
import { CardsComponent } from '../components/cards/cards.component';
import { NavToolbarComponent } from '../../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-messages',
  standalone: true,
  imports: [
    Level2HeaderComponent,
    CardsComponent,
    NavToolbarComponent,
    CommonModule,
  ],
  templateUrl: './read-messages.component.html',
  styleUrl: './read-messages.component.scss',
})
export class ReadMessagesComponent {
  // To be removed in v2.2.0
  newNavToolbar: boolean = true;

  headerText: string = 'Archive Inbox';
}
