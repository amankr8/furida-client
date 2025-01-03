import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import {
  openDocEditDialog,
  openDocDeleteDialog,
} from '../../../state/document/document.actions';
import { selectDocumentLoading } from '../../../state/document/document.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-menu-item',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, CommonModule],
  templateUrl: './doc-menu-item.component.html',
  styleUrl: './doc-menu-item.component.scss',
})
export class DocMenuItemComponent {
  @Input() docId!: number;
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);
  isAdminRoute: boolean = false;

  constructor(private store: Store) {}

  updateDocument() {
    this.store.dispatch(openDocEditDialog({ documentId: this.docId }));
  }

  deleteDocument() {
    this.store.dispatch(openDocDeleteDialog({ documentId: this.docId }));
  }
}
