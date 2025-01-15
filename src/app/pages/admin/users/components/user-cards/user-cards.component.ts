import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { User } from '../../../../../shared/interface/user';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectUserLoading,
  selectUsers,
} from '../../../../../state/user/user.selectors';
import {
  openUserDeleteDialog,
  openUserEditDialog,
} from '../../../../../state/user/user.actions';
import { selectAuthUser } from '../../../../../state/auth/auth.selectors';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

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
    MatDividerModule,
  ],
  templateUrl: './user-cards.component.html',
  styleUrl: './user-cards.component.scss',
})
export class UserCardsComponent {
  users$: Observable<User[]> = this.store.select(selectUsers);
  loading$: Observable<boolean> = this.store.select(selectUserLoading);
  editConstraint: string = 'Cannot update other users';
  deleteConstraint: string = 'Cannot delete current user';

  constructor(private store: Store) {}

  isLoggedInUser(username: string): Observable<boolean> {
    return this.store
      .select(selectAuthUser)
      .pipe(map((user) => (user ? user.username === username : false)));
  }

  updateUser() {
    this.store.dispatch(openUserEditDialog());
  }

  deleteUser(id: number) {
    this.store.dispatch(openUserDeleteDialog({ userId: id }));
  }
}
