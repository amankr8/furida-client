import { Component, ViewChild } from '@angular/core';
import { BannerBottomComponent } from './components/banner-bottom/banner-bottom.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NavbarV2Component } from '../components/navbar-v2/navbar-v2.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadProjects } from '../../state/project/project.actions';
import { selectProjectLoaded } from '../../state/project/project.selectors';
import { loadAuthUser } from '../../state/auth/auth.actions';
import { selectAuthLoaded } from '../../state/auth/auth.selectors';
import { BreakpointService } from '../../service/breakpoint/breakpoint.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
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
  token: string | null = this.authService.getAuthToken();
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);
  projectLoaded$: Observable<boolean> = this.store.select(selectProjectLoaded);
  smallScreen$: Observable<boolean> = this.breakpointService.isSmallScreen();

  constructor(
    private store: Store,
    private authService: AuthService,
    private breakpointService: BreakpointService
  ) {}

  ngOnInit() {
    this.projectLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProjects());
    });
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded && this.token != null) this.store.dispatch(loadAuthUser());
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
