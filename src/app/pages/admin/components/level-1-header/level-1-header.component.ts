import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DisplayTextHeadComponent } from '../../../components/display-text-head/display-text-head.component';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-level-1-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    DisplayTextHeadComponent,
    RouterLink,
    MatDividerModule,
  ],
  templateUrl: './level-1-header.component.html',
  styleUrl: './level-1-header.component.scss',
})
export class Level1HeaderComponent {
  @Input() headerText: string = '';
  @Input() buttonText: string = '';
  @Input() childLevelLink: string = '';
}
