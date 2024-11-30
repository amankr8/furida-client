import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIconModule,
    MatButtonModule,
    Level2HeaderComponent,
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent {
  headerText: string = 'Add New Project';
}
