import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Document } from '../../../shared/interface/document';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectProjectById } from '../../../state/project/project.selectors';
import { selectDocumentLoading } from '../../../state/document/document.selectors';
import { AdminRouteService } from '../../../service/admin-route/admin-route.service';
import {
  openDocEditDialog,
  openDocDeleteDialog,
} from '../../../state/document/document.actions';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-document-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.scss',
})
export class DocumentCardComponent {
  @Input() document!: Document;
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);
  isAdminRoute: boolean = this.adminRouteService.isAdminRoute();

  constructor(
    private store: Store,
    private adminRouteService: AdminRouteService
  ) {}

  getProjectNameById(id: number): Observable<String> {
    return this.store
      .select(selectProjectById(id))
      .pipe(map((project) => (project ? project.name : 'Unknown')));
  }

  updateDocument() {
    this.store.dispatch(openDocEditDialog({ documentId: this.document.id }));
  }

  deleteDocument() {
    this.store.dispatch(openDocDeleteDialog({ documentId: this.document.id }));
  }
}
