import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-side-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatDividerModule],
  templateUrl: './admin-side-menu.component.html',
  styleUrl: './admin-side-menu.component.scss',
})
export class AdminSideMenuComponent {}
