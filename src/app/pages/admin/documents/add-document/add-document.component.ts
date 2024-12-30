import { Component } from '@angular/core';
import { DocFormComponent } from '../components/doc-form/doc-form.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-add-document',
  standalone: true,
  imports: [DocFormComponent, CommonModule, NavToolbarComponent],
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.scss',
})
export class AddDocumentComponent {
  headerText: string = 'Add New Document';
}
