import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { confirmLogout } from '../../../../state/auth/auth.actions';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
})
export class LogoutButtonComponent {
  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(confirmLogout());
  }
}
