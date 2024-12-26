import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { User } from '../../../../../interface/user';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectUserLoaded,
  selectLoading,
  selectUsers,
} from '../../../../../state/user/user.selectors';
import {
  loadUsers,
  openDeleteDialog,
  openEditDialog,
} from '../../../../../state/user/user.actions';
import {
  selectAuthUser,
  selectAuthLoaded,
} from '../../../../../state/auth/auth.selectors';
import { loadAuthUser } from '../../../../../state/auth/auth.actions';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    CommonModule,
    MatTooltipModule,
    MatBadgeModule,
    MatIconModule,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  users$: Observable<User[]> = this.store.select(selectUsers);
  isUserLoaded$: Observable<boolean> = this.store.select(selectUserLoaded);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  isAuthUserLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);
  editConstraint: string = 'Cannot update other users';
  deleteConstraint: string = 'Cannot delete current user';

  constructor(private store: Store) {}

  ngOnInit() {
    this.isUserLoaded$.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadUsers());
    });
    this.isAuthUserLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }

  isLoggedInUser(username: string): Observable<boolean> {
    return this.store
      .select(selectAuthUser)
      .pipe(map((user) => (user ? user.username === username : false)));
  }

  updateUser() {
    this.store.dispatch(openEditDialog());
  }

  deleteUser(id: number) {
    this.store.dispatch(openDeleteDialog({ userId: id }));
  }
}
