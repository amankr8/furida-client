import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Document } from '../../../interface/document';
import { Store } from '@ngrx/store';
import {
  openDocDeleteDialog,
  openDocEditDialog,
} from '../../../state/document/document.actions';
import { Observable, map } from 'rxjs';
import { selectProjectById } from '../../../state/project/project.selectors';
import { selectDocumentLoading } from '../../../state/document/document.selectors';
import { Router } from '@angular/router';
import { DocMenuItemComponent } from '../doc-menu-item/doc-menu-item.component';

@Component({
  selector: 'app-document-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    DocMenuItemComponent,
  ],
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.scss',
})
export class DocumentCardComponent {
  @Input() document!: Document;
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);
  isAdminRoute: boolean = false;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.isAdminRoute = this.router.url.startsWith('/admin');
  }

  getProjectNameById(id: number): Observable<String> {
    return this.store
      .select(selectProjectById(id))
      .pipe(map((project) => (project ? project.name : 'Unknown')));
  }
}
