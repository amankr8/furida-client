import { Component } from '@angular/core';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';
import { CardsComponent } from '../components/cards/cards.component';
import { AdminHeaderComponent } from '../../../components/admin-header/admin-header.component';

@Component({
  selector: 'app-read-messages',
  standalone: true,
  imports: [Level2HeaderComponent, CardsComponent, AdminHeaderComponent],
  templateUrl: './read-messages.component.html',
  styleUrl: './read-messages.component.scss',
})
export class ReadMessagesComponent {
  headerText: string = 'Archive Inbox';
}
