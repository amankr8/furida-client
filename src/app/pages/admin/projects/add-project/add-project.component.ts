import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProjectFormComponent } from '../components/project-form/project-form.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../../components/nav-toolbar/nav-toolbar.component';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    ProjectFormComponent,
    CommonModule,
    NavToolbarComponent,
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent {
  headerText: string = 'Add New Project';
}
