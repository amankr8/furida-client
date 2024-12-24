import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from '../../../../interface/user';
import { loadAuthUser } from '../../../../state/auth/auth.actions';
import {
  selectAuthLoaded,
  selectAuthUser,
} from '../../../../state/auth/auth.selectors';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-logo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './main-logo.component.html',
  styleUrl: './main-logo.component.scss',
})
export class MainLogoComponent {
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);
  authUser$: Observable<User | null> = this.store.select(selectAuthUser);

  constructor(private store: Store) {}

  ngOnInit() {
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.authUser$.pipe(map((user) => user !== null));
  }
}
