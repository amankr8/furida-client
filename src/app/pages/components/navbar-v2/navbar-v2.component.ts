import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from '../../../interface/user';
import { loadAuthUser } from '../../../state/auth/auth.actions';
import {
  selectAuthLoaded,
  selectAuthUser,
} from '../../../state/auth/auth.selectors';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Project } from '../../../interface/project';
import {
  selectProjects,
  selectProjectLoaded,
} from '../../../state/project/project.selectors';
import { loadProjects } from '../../../state/project/project.actions';
import { MatMenuModule } from '@angular/material/menu';
import { BrandLogoV2Component } from '../brand-logo-v2/brand-logo-v2.component';

@Component({
  selector: 'app-navbar-v2',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    MatMenuModule,
    BrandLogoV2Component,
  ],
  templateUrl: './navbar-v2.component.html',
  styleUrl: './navbar-v2.component.scss',
})
export class NavbarV2Component {
  @Output() toggleSidenav = new EventEmitter<void>();
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);
  authUser$: Observable<User | null> = this.store.select(selectAuthUser);
  projects$: Observable<Project[]> = this.store.select(selectProjects);
  projectLoaded$: Observable<boolean> = this.store.select(selectProjectLoaded);
  smallScreen: boolean = false;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
    this.projectLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProjects());
    });
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.smallScreen = result.matches;
      });
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.authUser$.pipe(map((user) => user !== null));
  }

  toggleMenu() {
    this.toggleSidenav.emit();
  }
}
