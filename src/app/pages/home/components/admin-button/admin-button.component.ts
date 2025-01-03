import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from '../../../../shared/interface/user';
import { selectAuthUser } from '../../../../state/auth/auth.selectors';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, RouterLink],
  templateUrl: './admin-button.component.html',
  styleUrl: './admin-button.component.scss',
})
export class AdminButtonComponent {
  authUser$: Observable<User | null> = this.store.select(selectAuthUser);

  constructor(private store: Store) {}

  isUserLoggedIn(): Observable<boolean> {
    return this.authUser$.pipe(map((user) => user !== null));
  }
}
