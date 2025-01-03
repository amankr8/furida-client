import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { DisplayTextHeadComponent } from '../../../components/display-text-head/display-text-head.component';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { BreakpointService } from '../../../../service/breakpoint/breakpoint.service';

@Component({
  selector: 'app-nav-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    DisplayTextHeadComponent,
    MatDividerModule,
  ],
  templateUrl: './nav-toolbar.component.html',
  styleUrl: './nav-toolbar.component.scss',
})
export class NavToolbarComponent {
  @Input() headerText: string = '';
  @Input() buttonText: string = '';
  @Input() childLevelLink: string = '';
  smallScreen$: Observable<boolean> = this.breakpointService.isSmallScreen();
  isChild: boolean = false;

  constructor(private breakpointService: BreakpointService) {}

  ngOnChanges() {
    this.isChild = this.childLevelLink === '';
  }
}
