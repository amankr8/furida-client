import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Project } from '../../../../../interface/project';
import { ProjectService } from '../../../../../service/project/project.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-cards',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, CommonModule, MatButtonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
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
