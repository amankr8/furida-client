import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DocumentService } from '../../../../service/document/document.service';
import { CommonModule } from '@angular/common';
import { Document } from '../../../../interface/document';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, CommonModule, MatButtonModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  docs: Document[] = [];
  isLoading = false;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.isLoading = true;
    this.documentService.getAllDocuments().subscribe((data) => {
      this.docs = data;
      this.isLoading = false;
    });
  }
}
