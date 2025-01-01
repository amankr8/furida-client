import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectDocumentLoading } from '../../../../../state/document/document.selectors';
import { selectProjectById } from '../../../../../state/project/project.selectors';
import {
  openDocDeleteDialog,
  openDocEditDialog,
} from '../../../../../state/document/document.actions';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Document } from '../../../../../interface/document';

@Component({
  selector: 'app-document-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './document-table.component.html',
  styleUrl: './document-table.component.scss',
})
export class DocumentTableComponent {
  @Input() documents$!: Observable<Document[]>;
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);
  displayedColumns: string[] = [
    'name',
    'desc',
    'downloadLink',
    'edit',
    'delete',
  ];

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
