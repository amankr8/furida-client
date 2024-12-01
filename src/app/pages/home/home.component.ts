import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { UpdatesComponent } from './components/updates/updates.component';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from '../components/footer/footer.component';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';
import { BannerBottomComponent } from '../components/banner-bottom/banner-bottom.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    UpdatesComponent,
    MatDividerModule,
    FooterComponent,
    BannerComponent,
    SectionHeaderComponent,
    BannerBottomComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title: string = 'FURIDA NGO Jamshedpur';
  heading: string = 'LATEST UPDATES';
}
