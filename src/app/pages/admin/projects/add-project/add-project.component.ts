import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Level2HeaderComponent } from '../../components/level-2-header/level-2-header.component';
import { ProjectFormComponent } from '../components/project-form/project-form.component';
import { AdminHeaderComponent } from '../../../components/admin-header/admin-header.component';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    Level2HeaderComponent,
    ProjectFormComponent,
    AdminHeaderComponent,
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent {
  headerText: string = 'Add New Project';
}
