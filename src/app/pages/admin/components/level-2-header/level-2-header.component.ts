import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DisplayTextHeadComponent } from '../../../components/display-text-head/display-text-head.component';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-level-2-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    DisplayTextHeadComponent,
    RouterLink,
    MatDividerModule,
  ],
  templateUrl: './level-2-header.component.html',
  styleUrl: './level-2-header.component.scss',
})
export class Level2HeaderComponent {
  @Input() headerText: string = '';
}
