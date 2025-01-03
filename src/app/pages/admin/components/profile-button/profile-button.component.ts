import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { confirmLogout } from '../../../../state/auth/auth.actions';
import {
  selectAuthUser,
  selectAuthLoading,
} from '../../../../state/auth/auth.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, CommonModule],
  templateUrl: './profile-button.component.html',
  styleUrl: './profile-button.component.scss',
})
export class ProfileButtonComponent {
  authUsername$: Observable<string> = this.store
    .select(selectAuthUser)
    .pipe(map((user) => user?.username || 'Unknown'));
  authEmail$: Observable<string> = this.store
    .select(selectAuthUser)
    .pipe(map((user) => user?.email || 'Unknown'));
  authLoading$: Observable<boolean> = this.store.select(selectAuthLoading);

  constructor(private store: Store) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(confirmLogout());
  }
}
