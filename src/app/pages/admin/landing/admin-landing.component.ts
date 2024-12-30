import { Component } from '@angular/core';
import { AdminMenuComponent } from '../components/admin-menu/admin-menu.component';
import { Level0HeaderComponent } from '../components/level-0-header/level-0-header.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-admin-landing',
  standalone: true,
  imports: [
    AdminMenuComponent,
    Level0HeaderComponent,
    CommonModule,
    NavToolbarComponent,
  ],
  templateUrl: './admin-landing.component.html',
  styleUrl: './admin-landing.component.scss',
})
export class AdminLandingComponent {
  // To be removed in v2.2.0
  newNavToolbar: boolean = true;

  headerText: string = 'Admin Console';
}
