import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-bottom',
  standalone: true,
  imports: [],
  templateUrl: './banner-bottom.component.html',
  styleUrl: './banner-bottom.component.scss',
})
export class BannerBottomComponent {
  email: string = 'furida.jsr@gmail.com';
  phone: string = '72800669456';
}
