import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminNavbarV2Component } from './components/admin-navbar-v2/admin-navbar-v2.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadAuthUser } from '../../state/auth/auth.actions';
import { selectAuthLoaded } from '../../state/auth/auth.selectors';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AdminNavbarV2Component],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  authLoaded$: Observable<boolean> = this.store.select(selectAuthLoaded);

  constructor(private store: Store) {}

  ngOnInit() {
    this.authLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadAuthUser());
    });
  }
}
