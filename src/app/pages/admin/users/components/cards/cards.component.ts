import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../../../../interface/user';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectUserLoaded,
  selectLoading,
  selectUsers,
} from '../../../../../store/selectors/user.selectors';
import {
  loadUsers,
  openDeleteDialog,
  openEditDialog,
} from '../../../../../store/actions/user.actions';
import {
  selectAuthUser,
  selectAuthLoaded,
} from '../../../../../store/selectors/auth.selectors';
import { loadAuthUser } from '../../../../../store/actions/auth.actions';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatButtonModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  users$: Observable<User[]> = this.store.select(selectUsers);
  isUserLoaded$: Observable<boolean> = this.store.select(selectUserLoaded);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  isAuthUserLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);

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
