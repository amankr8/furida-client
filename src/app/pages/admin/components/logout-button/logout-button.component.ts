import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { logoutUser } from '../../../../state/auth/auth.actions';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
})
export class LogoutButtonComponent {
  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(logoutUser());
  }
}
