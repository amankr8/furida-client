import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { BrandLogoV2Component } from '../brand-logo-v2/brand-logo-v2.component';
import { BreakpointService } from '../../../service/breakpoint/breakpoint.service';
import { NavbarButtonsComponent } from '../navbar-buttons/navbar-buttons.component';
import { AdminRouteService } from '../../../service/admin-route/admin-route.service';
import { ProfileButtonComponent } from '../../admin/components/profile-button/profile-button.component';

@Component({
  selector: 'app-navbar-v2',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    MatMenuModule,
    BrandLogoV2Component,
    NavbarButtonsComponent,
    ProfileButtonComponent,
  ],
  templateUrl: './navbar-v2.component.html',
  styleUrl: './navbar-v2.component.scss',
})
export class NavbarV2Component {
  @Output() toggleSidenav = new EventEmitter<void>();
  smallScreen$: Observable<boolean> = this.breakpointService.isSmallScreen();
  isAdminRoute: boolean = this.adminRouteService.isAdminRoute();

  constructor(
    private breakpointService: BreakpointService,
    private adminRouteService: AdminRouteService
  ) {}

  toggleMenu() {
    this.toggleSidenav.emit();
  }
}
