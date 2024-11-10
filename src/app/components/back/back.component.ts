import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss',
})
export class BackComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/posts']);
  }
}
