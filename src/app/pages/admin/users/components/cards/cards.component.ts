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
import { loadUsers } from '../../../../../store/actions/user.actions';

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

  constructor(private store: Store) {}

  ngOnInit() {
    this.isUserLoaded.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadUsers());
    });
  }
}
