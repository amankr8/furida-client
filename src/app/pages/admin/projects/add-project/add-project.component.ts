import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';
import { ProjectFormComponent } from '../components/project-form/project-form.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    Level2HeaderComponent,
    ProjectFormComponent,
    CommonModule,
    NavToolbarComponent,
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent {
  // To be removed in v2.2.0
  newNavToolbar: boolean = true;

  headerText: string = 'Add New Project';
}
