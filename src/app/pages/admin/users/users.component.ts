import { Component } from '@angular/core';
import { UserCardsComponent } from './components/user-cards/user-cards.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { loadUsers } from '../../../state/user/user.actions';
import {
  selectUserLoaded,
  selectUserLoading,
} from '../../../state/user/user.selectors';
import { selectConfig } from '../../../state/config/config.selectors';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserTableComponent } from './components/user-table/user-table.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserCardsComponent,
    CommonModule,
    NavToolbarComponent,
    MatTabsModule,
    SignupFormComponent,
    MatProgressBarModule,
    UserTableComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  headerText: string = 'Users';
  buttonText: string = 'Add User';
  childLevelLink: string = 'signup';
  loading$: Observable<boolean> = this.store.select(selectUserLoading);
  isUserLoaded$: Observable<boolean> = this.store.select(selectUserLoaded);
  tableView$: Observable<boolean> = this.store
    .select(selectConfig)
    .pipe(map((config) => config.boolSetting1));

  constructor(private store: Store) {}

  ngOnInit() {
    this.isUserLoaded$.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadUsers());
    });
  }
}
