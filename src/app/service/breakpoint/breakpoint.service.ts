import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  isSmallScreen() {
    return this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall,
    ]);
  }

  isHandset() {
    return this.breakpointObserver.observe(Breakpoints.Handset);
  }
}
