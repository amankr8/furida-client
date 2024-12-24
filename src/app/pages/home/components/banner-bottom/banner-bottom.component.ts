import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner-bottom',
  standalone: true,
  imports: [RouterLink, MatDividerModule, CommonModule],
  templateUrl: './banner-bottom.component.html',
  styleUrl: './banner-bottom.component.scss',
})
export class BannerBottomComponent {
  email: string = 'furida.jsr@gmail.com';
  phone: string = '+91-7280069456';
  smallScreen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.smallScreen = result.matches;
      });
  }
}
