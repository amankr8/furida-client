import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Document } from '../../../../../interface/document';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectDocuments,
  selectDocumentLoaded,
  selectDocumentLoading,
} from '../../../../../state/document/document.selectors';
import {
  selectProjectLoaded,
  selectProjectById,
  selectProjects,
} from '../../../../../state/project/project.selectors';
import {
  loadDocuments,
  openDeleteDialog,
  openEditDialog,
} from '../../../../../state/document/document.actions';
import { loadProjects } from '../../../../../state/project/project.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-document-cards',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatProgressBarModule,
    MenuButtonComponent,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './document-cards.component.html',
  styleUrl: './document-cards.component.scss',
})
export class DocumentCardsComponent {
  projects$ = this.store.select(selectProjects);
  documents$: Observable<Document[]> = this.store.select(selectDocuments);
  isDocumentLoaded$: Observable<boolean> =
    this.store.select(selectDocumentLoaded);
  isProjectLoaded$: Observable<boolean> =
    this.store.select(selectProjectLoaded);
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);
  selectedProjectId: number | null = null;
  filteredDocuments$: Observable<Document[]> = this.documents$;

  constructor(private store: Store) {}

  ngOnInit() {
    this.isDocumentLoaded$.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadDocuments());
    });
    this.isProjectLoaded$.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadProjects());
    });
  }

  selectProject(projectId: number) {
    this.selectedProjectId = projectId;
    this.filteredDocuments$ = this.documents$.pipe(
      map((docs) =>
        projectId ? docs.filter((doc) => doc.projectId === projectId) : docs
      )
    );
  }

  getProjectNameById(id: number): Observable<String> {
    return this.store
      .select(selectProjectById(id))
      .pipe(map((project) => (project ? project.name : 'Unknown')));
  }

  update(id: number) {
    this.store.dispatch(openEditDialog({ documentId: id }));
  }

  delete(id: number) {
    this.store.dispatch(openDeleteDialog({ documentId: id }));
  }
}
