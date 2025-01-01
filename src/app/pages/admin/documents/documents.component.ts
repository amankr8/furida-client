import { Component } from '@angular/core';
import { DocumentCardsComponent } from './components/document-cards/document-cards.component';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-documents',
  standalone: true,
  imports: [DocumentCardsComponent, NavToolbarComponent, CommonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class AdminDocumentsComponent {
  headerText: string = 'Your Documents';
  buttonText: string = 'Add Doc';
  childLevelLink: string = 'add-document';

  constructor(private store: Store) {}
}
