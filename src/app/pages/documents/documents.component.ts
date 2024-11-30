import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from '../components/footer/footer.component';
import { FilesComponent } from './components/files/files.component';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';

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
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {
  title: string = 'Projects';
  heading: string = 'DOCUMENTS';
}
