import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../interface/project';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectIsProjectLoaded,
  selectProjects,
} from '../../../../state/project/project.selectors';
import { Observable } from 'rxjs';
import { loadProjects } from '../../../../state/project/project.actions';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AdminButtonComponent } from '../admin-button/admin-button.component';
import { MainLogoComponent } from '../main-logo/main-logo.component';

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
    AdminButtonComponent,
    MainLogoComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  projects$: Observable<Project[]> = this.store.select(selectProjects);
  projectLoaded$: Observable<boolean> = this.store.select(
    selectIsProjectLoaded
  );
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
