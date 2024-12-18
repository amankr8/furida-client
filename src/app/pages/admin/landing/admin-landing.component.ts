import { Component } from '@angular/core';
import { AdminMenuComponent } from '../components/admin-menu/admin-menu.component';
import { Level0HeaderComponent } from '../components/level-0-header/level-0-header.component';

@Component({
  selector: 'app-admin-landing',
  standalone: true,
  imports: [AdminMenuComponent, Level0HeaderComponent],
  templateUrl: './admin-landing.component.html',
  styleUrl: './admin-landing.component.scss',
})
export class AdminLandingComponent {}
