import { Component } from '@angular/core';
import { CardsComponent } from './components/cards/cards.component';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-documents',
  standalone: true,
  imports: [CardsComponent, NavToolbarComponent, CommonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class AdminDocumentsComponent {
  headerText: string = 'Your Documents';
  buttonText: string = 'Add Doc';
  childLevelLink: string = 'add-document';
}
