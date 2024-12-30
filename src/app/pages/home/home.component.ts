import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { BannerBottomComponent } from './components/banner-bottom/banner-bottom.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NavbarV2Component } from './components/navbar-v2/navbar-v2.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectHeaderConfig } from '../../state/config/config.selectors';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { loadProjects } from '../../state/project/project.actions';
import { selectProjectLoaded } from '../../state/project/project.selectors';
import { loadAuthUser } from '../../state/auth/auth.actions';
import { selectAuthLoaded } from '../../state/auth/auth.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerBottomComponent,
    FooterComponent,
    RouterOutlet,
    MatSidenavModule,
    SideMenuComponent,
    NavbarV2Component,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  newHeader: Observable<boolean> = this.store
    .select(selectHeaderConfig)
    .pipe(select((config) => config.newHeader));
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);
  projectLoaded$: Observable<boolean> = this.store.select(selectProjectLoaded);
  smallScreen: boolean = false;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.smallScreen = result.matches;
      });
    this.projectLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProjects());
    });
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
