import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Document } from '../../../shared/interface/document';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectProjectById } from '../../../state/project/project.selectors';
import { selectDocumentLoading } from '../../../state/document/document.selectors';
import { DocMenuItemComponent } from '../doc-menu-item/doc-menu-item.component';
import { AdminRouteService } from '../../../service/admin-route/admin-route.service';

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
  isAdminRoute: boolean = this.adminRouteService.isAdminRoute();

  constructor(
    private store: Store,
    private adminRouteService: AdminRouteService
  ) {}

  getProjectNameById(id: number): Observable<String> {
    return this.store
      .select(selectProjectById(id))
      .pipe(map((project) => (project ? project.name : 'Unknown')));
  }
}
