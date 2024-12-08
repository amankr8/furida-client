import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DocumentService } from '../../../../service/document/document.service';
import { CommonModule } from '@angular/common';
import { Document } from '../../../../interface/document';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../../../interface/project';
import { ProjectService } from '../../../../service/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, CommonModule, MatButtonModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  @Input() projectId!: number;

  docs: Document[] = [];
  projects: Project[] = [];
  isLoading = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private documentService: DocumentService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.projectId = +params['id'];
        this.loadDocuments();
      })
    );
    this.subscriptions.add(
      this.projectService.getAllProjects().subscribe((data) => {
        this.projects = data;
      })
    );
  }

  loadDocuments() {
    this.subscriptions.add(
      this.documentService
        .getDocumentsByProjectId(this.projectId)
        .subscribe((data) => {
          this.docs = data;
          this.isLoading = false;
        })
    );
  }

  getProjectNameById(id: number) {
    return (
      this.projects.find((project) => project.id === id)?.name || 'Unknown'
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
