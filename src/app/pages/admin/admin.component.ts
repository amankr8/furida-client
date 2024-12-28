import { Component } from '@angular/core';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminNavbarV2Component } from '../components/admin-navbar-v2/admin-navbar-v2.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AdminHeaderComponent,
    RouterOutlet,
    CommonModule,
    AdminNavbarV2Component,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  newAdminHeader: boolean = true;
}
