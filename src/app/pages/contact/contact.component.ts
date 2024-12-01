import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { BannerBottomComponent } from '../components/banner-bottom/banner-bottom.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    SectionHeaderComponent,
    ContactFormComponent,
    BannerBottomComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  title: string = 'Contact';
  heading: string = 'REACH OUT TO US';
}
