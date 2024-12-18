import { Component } from '@angular/core';
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
import { RoleService } from '../../../../../service/role/role.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthLoading } from '../../../../../state/auth/auth.selectors';
import { signUpUser } from '../../../../../state/auth/auth.actions';

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
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  roles: string[] = [];

  constructor(private roleService: RoleService, private store: Store) {}

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

  signup() {
    this.store.dispatch(signUpUser({ user: this.form.value }));
  }
}
