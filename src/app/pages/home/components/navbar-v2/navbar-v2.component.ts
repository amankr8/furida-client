import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Project } from '../../../../shared/interface/project';
import { selectProjects } from '../../../../state/project/project.selectors';
import { MatMenuModule } from '@angular/material/menu';
import { BrandLogoV2Component } from '../../../components/brand-logo-v2/brand-logo-v2.component';
import { AdminButtonComponent } from '../admin-button/admin-button.component';
import { BreakpointService } from '../../../../service/breakpoint/breakpoint.service';

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
    AdminButtonComponent,
  ],
  templateUrl: './navbar-v2.component.html',
  styleUrl: './navbar-v2.component.scss',
})
export class NavbarV2Component {
  @Output() toggleSidenav = new EventEmitter<void>();
  projects$: Observable<Project[]> = this.store.select(selectProjects);
  smallScreen$: Observable<boolean> = this.breakpointService.isSmallScreen();

  constructor(
    private store: Store,
    private breakpointService: BreakpointService
  ) {}

  toggleMenu() {
    this.toggleSidenav.emit();
  }
}
