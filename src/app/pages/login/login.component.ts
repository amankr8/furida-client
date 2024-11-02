import { Component, inject, Inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form!: FormGroup;
  hide = true;
  private snackBarRef = inject(MatSnackBar);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  login() {
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        this.router.navigate(['/posts']);
        this.snackBarRef.open(res.message, 'Dismiss', {
          duration: 3000,
        });
      },
      error: (err) => {
        this.snackBarRef.open(err, 'Dismiss', {
          duration: 3000,
        });
      },
    });
  }
}
