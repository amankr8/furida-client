import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { loadAuthUser } from '../../state/auth/auth.actions';
import { selectAuthLoaded } from '../../state/auth/auth.selectors';
import { NavbarV2Component } from '../components/navbar-v2/navbar-v2.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { AdminSideMenuComponent } from './components/admin-side-menu/admin-side-menu.component';
import { BreakpointService } from '../../service/breakpoint/breakpoint.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarV2Component,
    MatSidenavModule,
    AdminSideMenuComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  @ViewChild('sideDrawer') sideDrawer!: MatDrawer;
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);
  smallScreen$: Observable<boolean> = this.breakpointService.isSmallScreen();

  constructor(
    private store: Store,
    private breakpointService: BreakpointService
  ) {}

  ngOnInit() {
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }

  toggleDrawer() {
    this.sideDrawer.toggle();
  }
}
