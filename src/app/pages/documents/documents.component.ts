import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from '../components/footer/footer.component';
import { FilesComponent } from './components/files/files.component';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [HeaderComponent, MatDividerModule, FooterComponent, FilesComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {}
