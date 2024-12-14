import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Document } from '../../../../interface/document';
import { MatButtonModule } from '@angular/material/button';
import { map, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectIsProjectLoaded,
  selectProjectById,
} from '../../../../store/selectors/project.selectors';
import { loadProjects } from '../../../../store/actions/project.actions';
import { loadDocuments } from '../../../../store/actions/document.actions';
import {
  selectDocumentsByProjectId,
  selectIsDocumentLoaded,
  selectLoading,
} from '../../../../store/selectors/document.selectors';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, CommonModule, MatButtonModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  @Input() projectId!: number;
  docs$: Observable<Document[]> = this.store.select(
    selectDocumentsByProjectId(this.projectId)
  );
  isDocumentsLoaded$: Observable<boolean> = this.store.select(
    selectIsDocumentLoaded
  );
  isProjectsLoaded$: Observable<boolean> = this.store.select(
    selectIsProjectLoaded
  );
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.isDocumentsLoaded$.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadDocuments());
    });
    this.isProjectsLoaded$.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadProjects());
    });
  }

  ngOnChanges() {
    this.docs$ = this.store.select(selectDocumentsByProjectId(this.projectId));
    this.loading$ = this.store.select(selectLoading);
  }

  getProjectNameById(id: number): Observable<String> {
    return this.store
      .select(selectProjectById(id))
      .pipe(map((project) => (project ? project.name : 'Unknown')));
  }
}
