import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { Level0HeaderComponent } from './components/level-0-header/level-0-header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, AdminMenuComponent, Level0HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
