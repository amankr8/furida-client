import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Project } from '../../../../../shared/interface/project';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-project-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.scss',
})
export class ProjectTableComponent {
  projects$: Observable<Project[]> = this.store.select(selectProjects);
  loading$: Observable<boolean> = this.store.select(selectProjectLoading);
  displayedColumns: string[] = ['name', 'desc', 'address', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Project>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit() {
    this.projects$.subscribe((projects) => {
      this.dataSource.data = projects;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateProject(id: number) {
    this.store.dispatch(openProjectEditDialog({ projectId: id }));
  }

  deleteProject(id: number) {
    this.store.dispatch(openProjectDeleteDialog({ projectId: id }));
  }
}
