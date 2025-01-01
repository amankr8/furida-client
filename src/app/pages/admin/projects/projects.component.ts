import { Component } from '@angular/core';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProjects } from '../../../state/project/project.actions';
import {
  selectProjectLoaded,
  selectProjectLoading,
} from '../../../state/project/project.selectors';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NavToolbarComponent,
    CommonModule,
    ProjectTableComponent,
    MatProgressBarModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  headerText: string = 'Your Projects';
  buttonText: string = 'Add Project';
  childLevelLink: string = 'add-project';

  projectLoaded: Observable<boolean> = this.store.select(selectProjectLoaded);
  loading$: Observable<boolean> = this.store.select(selectProjectLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.projectLoaded.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProjects());
    });
  }
}
