import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../../../../../service/role/role.service';
import { AuthService } from '../../../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent {
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
