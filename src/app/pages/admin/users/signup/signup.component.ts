import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../../service/role.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    HeaderComponent,
    CommonModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form!: FormGroup;
  isLoading = false;
  roles: string[] = [];
  private snackBarRef = inject(MatSnackBar);

  constructor(
    private roleService: RoleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.roleService.getAllRoles().subscribe((data) => {
      this.roles = data;
    });
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      role: new FormControl('', Validators.required),
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  signup() {
    this.isLoading = true;
    this.authService.signup(this.form.value).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
        this.snackBarRef.open(res.message, 'Dismiss', {
          duration: 3000,
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBarRef.open(this.getErrorMessage(err), 'Dismiss', {
          duration: 3000,
        });
      },
    });
  }

  getErrorMessage(err: HttpErrorResponse): string {
    switch (err.status) {
      case 400:
        return 'Error: User already exists';
      case 500:
        return 'Server Error: Please try again later';
      default:
        return 'Error: An unknown error occurred';
    }
  }
}
