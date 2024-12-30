import { Component } from '@angular/core';
import { DisplayTextHeadComponent } from '../../../components/display-text-head/display-text-head.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from '../../../../interface/user';
import {
  selectAuthUser,
  selectAuthLoading,
} from '../../../../state/auth/auth.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { selectHeaderConfig } from '../../../../state/config/config.selectors';

@Component({
  selector: 'app-level-0-header',
  standalone: true,
  imports: [
    DisplayTextHeadComponent,
    LogoutButtonComponent,
    CommonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './level-0-header.component.html',
  styleUrl: './level-0-header.component.scss',
})
export class Level0HeaderComponent {
  // deprecated and marked for removal
  headerText: string = 'Admin Console';
  authUser$: Observable<User | null> = this.store.select(selectAuthUser);
  authLoading$: Observable<boolean> = this.store.select(selectAuthLoading);

  newAdminHeader: Observable<boolean> = this.store
    .select(selectHeaderConfig)
    .pipe(map((headerConfig) => headerConfig.newAdminHeader));

  constructor(private store: Store) {}

  getAuthUser(): Observable<string> {
    return this.authUser$.pipe(
      map((user) => (user ? `${user.username}(${user.role})` : ''))
    );
  }
}
