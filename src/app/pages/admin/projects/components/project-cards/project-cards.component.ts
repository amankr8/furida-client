import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Project } from '../../../../../interface/project';
import { ProjectService } from '../../../../../service/project/project.service';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  openDeleteDialog,
  loadProjects,
  openEditDialog,
} from '../../../../../store/actions/project.actions';
import {
  selectProjects,
  selectLoading,
  selectError,
} from '../../../../../store/selectors/project.selectors';

@Component({
  selector: 'app-project-cards',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, CommonModule, MatButtonModule],
  templateUrl: './project-cards.component.html',
  styleUrl: './project-cards.component.scss',
})
export class ProjectCardsComponent {
  projects$: Observable<Project[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.projects$ = this.store.select(selectProjects);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(loadProjects());
  }

  updateProject(id: number) {
    this.store.dispatch(openEditDialog({ projectId: id }));
  }

  deleteProject(id: number) {
    this.store.dispatch(openDeleteDialog({ projectId: id }));
  }
}
