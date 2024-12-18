import { Component } from '@angular/core';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';
import { CardsComponent } from './components/cards/cards.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';

@Component({
  selector: 'app-admin-documents',
  standalone: true,
  imports: [Level1HeaderComponent, CardsComponent, AdminHeaderComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class AdminDocumentsComponent {
  headerText: string = 'Your Documents';
  buttonText: string = 'Add New Doc';
  childLevelLink: string = 'add-document';
}
