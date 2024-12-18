import { Component } from '@angular/core';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { Level0HeaderComponent } from './components/level-0-header/level-0-header.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminMenuComponent, Level0HeaderComponent, AdminHeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
