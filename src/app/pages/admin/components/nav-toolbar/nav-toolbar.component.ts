import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { DisplayTextHeadComponent } from '../../../components/display-text-head/display-text-head.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-nav-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    DisplayTextHeadComponent,
    MatDividerModule,
  ],
  templateUrl: './nav-toolbar.component.html',
  styleUrl: './nav-toolbar.component.scss',
})
export class NavToolbarComponent {
  @Input() headerText: string = 'Projects';
  @Input() buttonText: string = '';
  @Input() childLevelLink: string = '';

  hasChild(): boolean {
    return this.childLevelLink !== '';
  }

  isChild(): boolean {
    return this.headerText !== 'Admin Console';
  }
}
