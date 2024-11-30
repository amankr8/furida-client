import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule, RouterLink],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.scss',
})
export class AdminMenuComponent {}
