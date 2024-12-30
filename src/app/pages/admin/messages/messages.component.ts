import { Component } from '@angular/core';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { CardsComponent } from './components/cards/cards.component';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    Level1HeaderComponent,
    CardsComponent,
    NavToolbarComponent,
    CommonModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  // To be removed in v2.2.0
  newNavToolbar: boolean = true;

  headerText: string = 'Inbox';
  buttonText: string = 'Archive Inbox';
  childLevelLink: string = 'read-messages';
}
