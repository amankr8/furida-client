import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';

@Component({
  selector: 'app-read-messages',
  standalone: true,
  imports: [HeaderComponent, Level2HeaderComponent],
  templateUrl: './read-messages.component.html',
  styleUrl: './read-messages.component.scss',
})
export class ReadMessagesComponent {
  headerText: string = 'Archive Inbox';
}
