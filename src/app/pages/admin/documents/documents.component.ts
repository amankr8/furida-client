import { Component } from '@angular/core';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { CardsComponent } from './components/cards/cards.component';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-documents',
  standalone: true,
  imports: [
    Level1HeaderComponent,
    CardsComponent,
    NavToolbarComponent,
    CommonModule,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class AdminDocumentsComponent {
  // To be removed in v2.2.0
  newNavToolbar: boolean = true;

  headerText: string = 'Your Documents';
  buttonText: string = 'Add Doc';
  childLevelLink: string = 'add-document';
}
