import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from '../components/footer/footer.component';
import { FilesComponent } from './components/files/files.component';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';
import { BannerBottomComponent } from '../components/banner-bottom/banner-bottom.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../service/project/project.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    HeaderComponent,
    MatDividerModule,
    FooterComponent,
    FilesComponent,
    BannerComponent,
    SectionHeaderComponent,
    BannerBottomComponent,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  title: string = '';
  heading: string = 'DOCUMENTS';
  projectId: number = -1;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.projectId = +params['id'];
        this.loadProjectName();
      })
    );
  }

  loadProjectName() {
    this.subscriptions.add(
      this.projectService
        .getProjectById(this.projectId)
        .subscribe((project) => {
          this.title = project?.name || 'Unknown';
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
