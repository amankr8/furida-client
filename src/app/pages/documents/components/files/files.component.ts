import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DocumentService } from '../../../../service/document/document.service';
import { CommonModule } from '@angular/common';
import { Document } from '../../../../interface/document';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProjectById } from '../../../../store/selectors/project.selectors';

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
  isLoading = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.projectId = +params['id'];
        this.loadDocuments();
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

  getProjectNameById(id: number): Observable<String> {
    return this.store
      .select(selectProjectById(id))
      .pipe(map((project) => (project ? project.name : 'Unknown')));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
