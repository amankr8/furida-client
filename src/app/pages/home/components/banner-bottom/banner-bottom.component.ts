import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner-bottom',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './banner-bottom.component.html',
  styleUrl: './banner-bottom.component.scss',
})
export class BannerBottomComponent {
  email: string = 'furida.jsr@gmail.com';
  phone: string = '+91-7280069456';
}
