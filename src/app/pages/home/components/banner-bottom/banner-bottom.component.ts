import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { BreakpointService } from '../../../../service/breakpoint/breakpoint.service';

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
  smallScreen$: Observable<boolean> = this.breakpointService.isSmallScreen();

  constructor(private breakpointService: BreakpointService) {}
}
