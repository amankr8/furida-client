import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectDocumentLoading } from '../../../../../state/document/document.selectors';
import { selectProjectById } from '../../../../../state/project/project.selectors';
import {
  openDocDeleteDialog,
  openDocEditDialog,
} from '../../../../../state/document/document.actions';

@Component({
  selector: 'app-document-table',
  standalone: true,
  imports: [],
  templateUrl: './document-table.component.html',
  styleUrl: './document-table.component.scss',
})
export class DocumentTableComponent {
  @Input() documents$!: Observable<Document[]>;
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);

  constructor(private store: Store) {}

  getProjectNameById(id: number): Observable<String> {
    return this.store
      .select(selectProjectById(id))
      .pipe(map((project) => (project ? project.name : 'Unknown')));
  }

  updateDoc(id: number) {
    this.store.dispatch(openDocEditDialog({ documentId: id }));
  }

  deleteDoc(id: number) {
    this.store.dispatch(openDocDeleteDialog({ documentId: id }));
  }
}
