import { Component } from '@angular/core';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';
import { AboutBannerComponent } from './components/about-banner/about-banner.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BannerComponent, SectionHeaderComponent, AboutBannerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  title: string = 'About';
  heading: string = 'ABOUT US';
}
