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
  selectIsDocumentLoaded,
  selectLoading,
} from '../../../../../store/selectors/document.selectors';
import {
  selectIsProjectLoaded,
  selectProjectById,
} from '../../../../../store/selectors/project.selectors';
import {
  loadDocuments,
  openDeleteDialog,
  openEditDialog,
} from '../../../../../store/actions/document.actions';
import { loadProjects } from '../../../../../store/actions/project.actions';

@Component({
  selector: 'app-document-cards',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatProgressBarModule,
    MenuButtonComponent,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  documents$: Observable<Document[]> = this.store.select(selectDocuments);
  isDocumentLoaded$: Observable<boolean> = this.store.select(
    selectIsDocumentLoaded
  );
  isProjectLoaded$: Observable<boolean> = this.store.select(
    selectIsProjectLoaded
  );
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.isDocumentLoaded$.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadDocuments());
    });
    this.isProjectLoaded$.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadProjects());
    });
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
