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
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../service/role.service';

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
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form!: FormGroup;
  hide = true;
  roles: string[] = [];
  private snackBarRef = inject(MatSnackBar);

  constructor(
    private roleService: RoleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.removeItem('jwtToken');
    this.roleService.getAllRoles().subscribe((data) => {
      console.log(data);
      this.roles = data;
    });
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  signup() {
    this.authService.signup(this.form.value).subscribe((res) => {
      this.router.navigate(['/login']);
      this.snackBarRef.open('User registered successfully!', 'Dismiss', {
        duration: 3000,
      });
    });
  }
}
