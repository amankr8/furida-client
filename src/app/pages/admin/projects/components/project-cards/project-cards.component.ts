import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Project } from '../../../../../interface/project';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  openDeleteDialog,
  loadProjects,
  openEditDialog,
} from '../../../../../state/project/project.actions';
import {
  selectProjects,
  selectProjectLoading,
  selectProjectLoaded,
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
  projectLoaded: Observable<boolean> = this.store.select(selectProjectLoaded);
  loading$: Observable<boolean> = this.store.select(selectProjectLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.projectLoaded.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProjects());
    });
  }

  updateProject(id: number) {
    this.store.dispatch(openEditDialog({ projectId: id }));
  }

  deleteProject(id: number) {
    this.store.dispatch(openDeleteDialog({ projectId: id }));
  }
}
