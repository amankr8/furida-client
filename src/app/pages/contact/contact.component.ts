import { Component } from '@angular/core';
import { BannerComponent } from '../components/banner/banner.component';
import { SectionHeaderComponent } from '../components/section-header/section-header.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BannerComponent, SectionHeaderComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  title: string = 'Contact';
  heading: string = 'REACH OUT TO US';
}
