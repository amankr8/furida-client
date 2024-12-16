import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../../../../interface/user';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectIsUserLoaded,
  selectLoading,
  selectUsers,
} from '../../../../../store/selectors/user.selectors';
import {
  loadUsers,
  openDeleteDialog,
  openEditDialog,
} from '../../../../../store/actions/user.actions';
import { selectAuthUsername } from '../../../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatButtonModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  users$: Observable<User[]> = this.store.select(selectUsers);
  isUserLoaded: Observable<boolean> = this.store.select(selectIsUserLoaded);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  loggedInUser$: Observable<string | null> =
    this.store.select(selectAuthUsername);

  constructor(private store: Store) {}

  ngOnInit() {
    this.isUserLoaded.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadUsers());
    });
  }

  // Create an observable to track button states for each user
  getButtonStates(
    user: User
  ): Observable<{ canEdit: boolean; canDelete: boolean }> {
    return combineLatest([this.loggedInUser$, this.loading$]).pipe(
      map(([loggedInUsername, loading]) => ({
        canEdit: user.username === loggedInUsername && !loading,
        canDelete: user.username !== loggedInUsername && !loading,
      }))
    );
  }

  updateUser() {
    this.store.dispatch(openEditDialog());
  }

  deleteUser(id: number) {
    this.store.dispatch(openDeleteDialog({ userId: id }));
  }
}
