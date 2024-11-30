import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Project } from '../../../interface/project';
import { UserService } from '../../../service/user.service';
import { ProjectService } from '../../../service/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [];
  isLoading = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data;
      this.isLoading = false;
    });
  }
}
