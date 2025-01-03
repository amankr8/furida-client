import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Project } from '../../../../../shared/interface/project';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  openProjectDeleteDialog,
  openProjectEditDialog,
} from '../../../../../state/project/project.actions';
import {
  selectProjects,
  selectProjectLoading,
} from '../../../../../state/project/project.selectors';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-cards',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './project-cards.component.html',
  styleUrl: './project-cards.component.scss',
})
export class ProjectCardsComponent {
  projects$: Observable<Project[]> = this.store.select(selectProjects);
  loading$: Observable<boolean> = this.store.select(selectProjectLoading);

  constructor(private store: Store) {}

  updateProject(id: number) {
    this.store.dispatch(openProjectEditDialog({ projectId: id }));
  }

  deleteProject(id: number) {
    this.store.dispatch(openProjectDeleteDialog({ projectId: id }));
  }
}
