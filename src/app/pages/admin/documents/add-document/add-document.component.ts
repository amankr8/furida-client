import { Component } from '@angular/core';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';
import { DocFormComponent } from '../components/doc-form/doc-form.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';

@Component({
  selector: 'app-add-document',
  standalone: true,
  imports: [Level2HeaderComponent, DocFormComponent, AdminHeaderComponent],
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.scss',
})
export class AddDocumentComponent {
  headerText: string = 'Add New Document';
}
