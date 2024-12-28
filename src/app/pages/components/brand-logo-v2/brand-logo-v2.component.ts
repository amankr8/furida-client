import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-brand-logo-v2',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './brand-logo-v2.component.html',
  styleUrl: './brand-logo-v2.component.scss',
})
export class BrandLogoV2Component {}
