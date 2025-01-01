import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Document } from '../../../../../interface/document';
import { MatButtonModule } from '@angular/material/button';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectProjectLoaded,
  selectProjectById,
} from '../../../../../state/project/project.selectors';
import { loadProjects } from '../../../../../state/project/project.actions';
import { loadDocuments } from '../../../../../state/document/document.actions';
import {
  selectDocumentsByProjectId,
  selectDocumentLoaded,
  selectDocumentLoading,
} from '../../../../../state/document/document.selectors';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  @Input() projectId!: number;
  docs$: Observable<Document[]> = this.store.select(
    selectDocumentsByProjectId(this.projectId)
  );
  documentLoaded$: Observable<boolean> =
    this.store.select(selectDocumentLoaded);
  projectLoaded$: Observable<boolean> = this.store.select(selectProjectLoaded);
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.documentLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadDocuments());
    });
    this.projectLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProjects());
    });
  }

  ngOnChanges() {
    this.docs$ = this.store.select(selectDocumentsByProjectId(this.projectId));
    this.loading$ = this.store.select(selectDocumentLoading);
  }

  getProjectNameById(id: number): Observable<String> {
    return this.store
      .select(selectProjectById(id))
      .pipe(map((project) => (project ? project.name : 'Unknown')));
  }
}
