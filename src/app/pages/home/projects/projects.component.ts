import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FilesComponent } from './components/files/files.component';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProjectById } from '../../../state/project/project.selectors';
import { map, Observable, switchMap, tap } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { loadDocuments } from '../../../state/document/document.actions';
import {
  selectDocumentLoaded,
  selectDocumentLoading,
} from '../../../state/document/document.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-projects',
  standalone: true,
  imports: [
    MatDividerModule,
    FilesComponent,
    BannerComponent,
    SectionHeaderComponent,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class MainProjectsComponent {
  title: string = 'Unknown';
  heading: string = 'DOCUMENTS';
  projectId!: number;

  documentLoaded$: Observable<boolean> =
    this.store.select(selectDocumentLoaded);
  loading$: Observable<boolean> = this.store.select(selectDocumentLoading);

  project$ = this.route.params.pipe(
    map((params) => +params['id']),
    tap((id) => (this.projectId = id)),
    switchMap((id) => this.store.select(selectProjectById(id)))
  );

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.project$.subscribe((project) => {
      this.title = project?.name || 'Unknown';
    });
    this.documentLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadDocuments());
    });
  }
}
