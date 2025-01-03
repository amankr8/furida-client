import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Document } from '../../../../../shared/interface/document';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectDocumentsByProjectId } from '../../../../../state/document/document.selectors';
import { MatIconModule } from '@angular/material/icon';
import { DocumentCardComponent } from '../../../../components/document-card/document-card.component';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DocumentCardComponent,
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  @Input() projectId!: number;
  docs$: Observable<Document[]> = this.store.select(
    selectDocumentsByProjectId(this.projectId)
  );

  constructor(private store: Store) {}

  ngOnChanges() {
    this.docs$ = this.store.select(selectDocumentsByProjectId(this.projectId));
  }
}
