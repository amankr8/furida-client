import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form!: FormGroup;
  hide = true;
  private snackBarRef = inject(MatSnackBar);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  signup() {
    this.authService.signup(this.form.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/login']);
      this.snackBarRef.open('User registered successfully!', 'Dismiss', {
        duration: 3000,
      });
    });
  }
}
