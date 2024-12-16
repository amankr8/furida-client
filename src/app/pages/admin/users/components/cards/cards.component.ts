import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../../../../interface/user';
import { Observable } from 'rxjs';
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
import { AuthService } from '../../../../../service/auth/auth.service';

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
  loggedInUser: string | null = null;

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {
    this.isUserLoaded.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadUsers());
    });
    this.loggedInUser = this.authService.getLoggedInUsername();
  }

  isLoggedInUser(username: string): boolean {
    return username === this.loggedInUser;
  }

  updateUser() {
    this.store.dispatch(openEditDialog());
  }

  deleteUser(id: number) {
    this.store.dispatch(openDeleteDialog({ userId: id }));
  }
}
