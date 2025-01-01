import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Project } from '../../../../../interface/project';
import {
  selectProjectLoading,
  selectProjects,
} from '../../../../../state/project/project.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import {
  openProjectDeleteDialog,
  openProjectEditDialog,
} from '../../../../../state/project/project.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.scss',
})
export class ProjectTableComponent {
  projects$: Observable<Project[]> = this.store.select(selectProjects);
  loading$: Observable<boolean> = this.store.select(selectProjectLoading);
  displayedColumns: string[] = ['name', 'desc', 'address', 'edit', 'delete'];

  constructor(private store: Store) {}

  updateProject(id: number) {
    this.store.dispatch(openProjectEditDialog({ projectId: id }));
  }

  deleteProject(id: number) {
    this.store.dispatch(openProjectDeleteDialog({ projectId: id }));
  }
}
