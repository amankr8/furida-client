import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from '../../../../interface/user';
import { loadAuthUser } from '../../../../state/auth/auth.actions';
import {
  selectAuthLoaded,
  selectAuthUser,
} from '../../../../state/auth/auth.selectors';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Project } from '../../../../interface/project';
import {
  selectProjects,
  selectProjectLoaded,
} from '../../../../state/project/project.selectors';
import { loadProjects } from '../../../../state/project/project.actions';
import { MatMenuModule } from '@angular/material/menu';
import { BrandLogoV2Component } from '../../../components/brand-logo-v2/brand-logo-v2.component';
import { AdminButtonComponent } from '../admin-button/admin-button.component';

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
    AdminButtonComponent,
  ],
  templateUrl: './navbar-v2.component.html',
  styleUrl: './navbar-v2.component.scss',
})
export class NavbarV2Component {
  @Output() toggleSidenav = new EventEmitter<void>();
  projects$: Observable<Project[]> = this.store.select(selectProjects);
  projectLoaded$: Observable<boolean> = this.store.select(selectProjectLoaded);
  smallScreen: boolean = false;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.projectLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProjects());
    });
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.smallScreen = result.matches;
      });
  }

  toggleMenu() {
    this.toggleSidenav.emit();
  }
}
