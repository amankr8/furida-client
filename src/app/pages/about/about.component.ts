import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AboutBannerComponent } from './components/about-banner/about-banner.component';
import { BannerBottomComponent } from '../components/banner-bottom/banner-bottom.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    SectionHeaderComponent,
    FooterComponent,
    AboutBannerComponent,
    BannerBottomComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  title: string = 'About';
  heading: string = 'ABOUT US';
}
