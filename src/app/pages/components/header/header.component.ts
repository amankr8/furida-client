import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Project } from '../../../interface/project';
import { ProjectService } from '../../../service/project/project.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectIsProjectLoaded,
  selectProjects,
} from '../../../store/selectors/project.selectors';
import { map, Observable } from 'rxjs';
import { loadProjects } from '../../../store/actions/project.actions';
import {
  selectAuthLoaded,
  selectAuthUser,
} from '../../../store/selectors/auth.selectors';
import { User } from '../../../interface/user';
import { loadAuthUser } from '../../../store/actions/auth.actions';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  projects$: Observable<Project[]> = this.store.select(selectProjects);
  isProjectLoaded$: Observable<boolean> = this.store.select(
    selectIsProjectLoaded
  );
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);
  authUser$: Observable<User | null> = this.store.select(selectAuthUser);

  constructor(private store: Store) {}

  ngOnInit() {
    this.isProjectLoaded$.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadProjects());
    });
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.authUser$.pipe(map((user) => user !== null));
  }
}
