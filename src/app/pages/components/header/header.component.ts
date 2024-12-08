import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Project } from '../../../interface/project';
import { ProjectService } from '../../../service/project/project.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectProjects } from '../../../store/selectors/project.selectors';
import { Observable } from 'rxjs';
import { loadProjects } from '../../../store/actions/project.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  projects$: Observable<Project[]>;

  constructor(private projectService: ProjectService, private store: Store) {
    this.projects$ = this.store.select(selectProjects);
  }

  ngOnInit() {
    this.store.dispatch(loadProjects());
  }
}
