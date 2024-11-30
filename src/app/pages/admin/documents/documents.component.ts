import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Level1HeaderComponent } from '../components/level-1-header/level-1-header.component';

@Component({
  selector: 'app-admin-documents',
  standalone: true,
  imports: [HeaderComponent, Level1HeaderComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class AdminDocumentsComponent {
  headerText: string = 'Your Documents';
  buttonText: string = 'Add New Doc';
  childLevelLink: string = 'add-document';
}
