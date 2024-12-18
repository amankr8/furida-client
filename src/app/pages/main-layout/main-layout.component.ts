import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { BannerBottomComponent } from '../components/banner-bottom/banner-bottom.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerBottomComponent,
    FooterComponent,
    RouterOutlet,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
