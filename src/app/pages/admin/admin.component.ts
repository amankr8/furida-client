import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { DisplayTextHeadComponent } from '../components/display-text-head/display-text-head.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAuthLoaded,
  selectAuthUser,
} from '../../store/selectors/auth.selectors';
import { loadAuthUser } from '../../store/actions/auth.actions';
import { User } from '../../interface/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent,
    DisplayTextHeadComponent,
    LogoutButtonComponent,
    AdminMenuComponent,
    CommonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  headerText: string = 'Admin Console';
  authUser$: Observable<User | null> = this.store.select(selectAuthUser);
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);

  constructor(private store: Store) {}

  ngOnInit() {
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }

  getAuthUser(): Observable<string> {
    return this.authUser$.pipe(
      map((user) => (user ? `${user.username}(${user.role})` : '[Not Found]'))
    );
  }
}
