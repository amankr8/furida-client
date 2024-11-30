import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    SectionHeaderComponent,
    FooterComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  title: string = 'About';
  heading: string = 'ABOUT US';
}
