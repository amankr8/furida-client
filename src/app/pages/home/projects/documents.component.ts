import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FilesComponent } from '../projects/components/files/files.component';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProjectById } from '../../../store/selectors/project.selectors';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    MatDividerModule,
    FilesComponent,
    BannerComponent,
    SectionHeaderComponent,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  title: string = 'Unknown';
  heading: string = 'DOCUMENTS';
  projectId!: number;

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
  }
}
