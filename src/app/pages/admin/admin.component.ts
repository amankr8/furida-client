import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { DisplayTextHeadComponent } from '../components/display-text-head/display-text-head.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent,
    DisplayTextHeadComponent,
    LogoutButtonComponent,
    AdminMenuComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  headerText: string = 'Admin Console';

  constructor() {}
}
