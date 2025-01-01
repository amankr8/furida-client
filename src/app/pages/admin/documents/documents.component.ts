import { Component } from '@angular/core';
import { DocumentCardsComponent } from './components/document-cards/document-cards.component';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {
  selectDocumentLoaded,
  selectDocumentLoading,
  selectDocuments,
} from '../../../state/document/document.selectors';
import {
  selectProjects,
  selectProjectLoaded,
} from '../../../state/project/project.selectors';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { loadProjects } from '../../../state/project/project.actions';
import { Document } from '../../../interface/document';
import { loadDocuments } from '../../../state/document/document.actions';

@Component({
  selector: 'app-admin-documents',
  standalone: true,
  imports: [
    DocumentCardsComponent,
    NavToolbarComponent,
    CommonModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class AdminDocumentsComponent {
  headerText: string = 'Your Documents';
  buttonText: string = 'Add Doc';
  childLevelLink: string = 'add-document';

  documents$: Observable<Document[]> = this.store.select(selectDocuments);
  filteredDocuments$: Observable<Document[]> = this.documents$;
  isDocumentLoaded$: Observable<boolean> =
    this.store.select(selectDocumentLoaded);
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);
  projects$ = this.store.select(selectProjects);
  isProjectLoaded$: Observable<boolean> =
    this.store.select(selectProjectLoaded);
  selectedProjectId: number | null = null;

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
      map((documents) =>
        this.selectedProjectId
          ? documents.filter((document) => document.projectId === projectId)
          : documents
      )
    );
  }
}
