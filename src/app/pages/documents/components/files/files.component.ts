import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DocumentService } from '../../../../service/document/document.service';
import { CommonModule } from '@angular/common';
import { Document } from '../../../../interface/document';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../../../interface/project';
import { ProjectService } from '../../../../service/project/project.service';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, CommonModule, MatButtonModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  docs: Document[] = [];
  projects: Project[] = [];
  isLoading = false;

  constructor(
    private documentService: DocumentService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data;
    });
    this.documentService.getAllDocuments().subscribe((data) => {
      this.docs = data;
      this.isLoading = false;
    });
  }

  getProjectNameById(id: number) {
    return this.projects.find((project) => project.id === id)?.name;
  }
}
