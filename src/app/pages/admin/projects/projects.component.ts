import { Component } from '@angular/core';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { loadProjects } from '../../../state/project/project.actions';
import {
  selectProjectLoaded,
  selectProjectLoading,
} from '../../../state/project/project.selectors';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { selectConfig } from '../../../state/config/config.selectors';
import { ProjectCardsComponent } from './components/project-cards/project-cards.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NavToolbarComponent,
    CommonModule,
    ProjectTableComponent,
    MatProgressBarModule,
    ProjectCardsComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  headerText: string = 'Your Projects';
  buttonText: string = 'Add Project';
  childLevelLink: string = 'add-project';

  tableView$: Observable<boolean> = this.store
    .select(selectConfig)
    .pipe(map((config) => config.boolSetting1));
  projectLoaded: Observable<boolean> = this.store.select(selectProjectLoaded);
  loading$: Observable<boolean> = this.store.select(selectProjectLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.projectLoaded.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProjects());
    });
  }
}
