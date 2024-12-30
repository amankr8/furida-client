import { Component } from '@angular/core';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminNavbarV2Component } from './components/admin-navbar-v2/admin-navbar-v2.component';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectHeaderConfig } from '../../state/config/config.selectors';
import { loadAuthUser } from '../../state/auth/auth.actions';
import { selectAuthLoaded } from '../../state/auth/auth.selectors';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AdminHeaderComponent,
    RouterOutlet,
    CommonModule,
    AdminNavbarV2Component,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  newAdminHeader: Observable<boolean> = this.store
    .select(selectHeaderConfig)
    .pipe(map((headerConfig) => headerConfig.newAdminHeader));
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);

  constructor(private store: Store) {}

  ngOnInit() {
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }
}
