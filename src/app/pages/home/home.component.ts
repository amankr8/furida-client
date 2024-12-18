import { Component } from '@angular/core';
import { UpdatesComponent } from './components/updates/updates.component';
import { MatDividerModule } from '@angular/material/divider';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UpdatesComponent,
    MatDividerModule,
    BannerComponent,
    SectionHeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title: string = 'FURIDA NGO Jamshedpur';
  heading: string = 'LATEST UPDATES';
}
