import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
})
export class LogoutButtonComponent {
  private snackBarRef = inject(MatSnackBar);

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.snackBarRef.open('Logged out successfully!', 'Dismiss', {
      duration: 3000,
    });
  }
}
