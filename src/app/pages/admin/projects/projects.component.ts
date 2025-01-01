import { Component } from '@angular/core';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProjects } from '../../../state/project/project.actions';
import { selectProjectLoaded } from '../../../state/project/project.selectors';
import { ProjectTableComponent } from './components/project-table/project-table.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NavToolbarComponent, CommonModule, ProjectTableComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  headerText: string = 'Your Projects';
  buttonText: string = 'Add Project';
  childLevelLink: string = 'add-project';

  projectLoaded: Observable<boolean> = this.store.select(selectProjectLoaded);

  constructor(private store: Store) {}

  ngOnInit() {
    this.projectLoaded.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProjects());
    });
  }
}
