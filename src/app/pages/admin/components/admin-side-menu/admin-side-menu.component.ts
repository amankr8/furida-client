import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { confirmLogout } from '../../../../state/auth/auth.actions';
import { selectAuthUser } from '../../../../state/auth/auth.selectors';
import { RouterModule } from '@angular/router';
import { BreakpointService } from '../../../../service/breakpoint/breakpoint.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-side-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDividerModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './admin-side-menu.component.html',
  styleUrl: './admin-side-menu.component.scss',
})
export class AdminSideMenuComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  authUsername$: Observable<string> = this.store
    .select(selectAuthUser)
    .pipe(map((user) => user?.username || '[unknown]'));
  authEmail$: Observable<string> = this.store
    .select(selectAuthUser)
    .pipe(map((user) => user?.email || '[unknown]'));
  smallScreen$: Observable<boolean> = this.breakpointService.isSmallScreen();

  constructor(
    private store: Store,
    private breakpointService: BreakpointService
  ) {}

  toggleMenu() {
    this.smallScreen$.subscribe((small) => {
      if (small) {
        this.toggleSidenav.emit();
      }
    });
  }

  logout() {
    this.store.dispatch(confirmLogout());
  }
}
