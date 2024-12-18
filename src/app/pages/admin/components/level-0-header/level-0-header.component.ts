import { Component } from '@angular/core';
import { DisplayTextHeadComponent } from '../../../main-layout/components/display-text-head/display-text-head.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from '../../../../interface/user';
import { loadAuthUser } from '../../../../store/actions/auth.actions';
import {
  selectAuthUser,
  selectAuthLoaded,
  selectAuthLoading,
} from '../../../../store/selectors/auth.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-level-0-header',
  standalone: true,
  imports: [
    DisplayTextHeadComponent,
    LogoutButtonComponent,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './level-0-header.component.html',
  styleUrl: './level-0-header.component.scss',
})
export class Level0HeaderComponent {
  headerText: string = 'Admin Console';
  authUser$: Observable<User | null> = this.store.select(selectAuthUser);
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);
  authLoading$: Observable<boolean> = this.store.select(selectAuthLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }

  getAuthUser(): Observable<string> {
    return this.authUser$.pipe(
      map((user) => (user ? `${user.username}(${user.role})` : ''))
    );
  }
}
