import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadAuthUser } from '../../state/auth/auth.actions';
import { selectAuthLoaded } from '../../state/auth/auth.selectors';
import { NavbarV2Component } from '../components/navbar-v2/navbar-v2.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { AdminSideMenuComponent } from './components/admin-side-menu/admin-side-menu.component';

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

  constructor(private store: Store) {}

  ngOnInit() {
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }

  toggleDrawer() {
    this.sideDrawer.toggle();
  }
}
