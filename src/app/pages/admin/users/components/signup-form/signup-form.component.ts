import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
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
import { combineLatest, filter, first, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthLoading } from '../../../../../state/auth/auth.selectors';
import { signUpUser } from '../../../../../state/auth/auth.actions';
import { selectUserError } from '../../../../../state/user/user.selectors';

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
  @ViewChild('formDirective') formDirective!: FormGroupDirective;
  form!: FormGroup;
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  roles: string[] = [];
  error$: Observable<string | null> = this.store.select(selectUserError);
  success$: Observable<Boolean> = combineLatest([
    this.loading$,
    this.error$,
  ]).pipe(map(([loading, error]) => !loading && !error));

  constructor(private roleService: RoleService, private store: Store) {}

  ngOnInit() {
    this.roleService.getAllRoles().subscribe((data) => {
      this.roles = data;
    });
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  signup() {
    this.store.dispatch(signUpUser({ user: this.form.value }));
    this.success$
      .pipe(
        filter((success) => success === true),
        first()
      )
      .subscribe(() => this.formDirective.resetForm());
  }
}
