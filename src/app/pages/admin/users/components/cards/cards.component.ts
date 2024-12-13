import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../../../../interface/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectUsers,
} from '../../../../../store/selectors/user.selectors';
import { loadUsers } from '../../../../../store/actions/user.action';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatButtonModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }
}
