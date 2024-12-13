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
  selectLoading,
} from '../../../../../store/selectors/document.selectors';
import { selectProjectById } from '../../../../../store/selectors/project.selectors';
import {
  loadDocuments,
  openDeleteDialog,
  openEditDialog,
} from '../../../../../store/actions/document.action';
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
  documents$: Observable<Document[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.documents$ = this.store.select(selectDocuments);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadDocuments());
    this.store.dispatch(loadProjects());
  }

  getProjectNameById(id: number): Observable<String> {
    return this.store
      .select(selectProjectById(id))
      .pipe(map((project) => (project ? project.name : 'Unknown')));
  }

  openEditDialog(id: number) {
    this.store.dispatch(openEditDialog({ documentId: id }));
  }

  openDeleteDialog(id: number) {
    this.store.dispatch(openDeleteDialog({ documentId: id }));
  }
}
