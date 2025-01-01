import { Component, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { updatePass } from '../../../../state/auth/auth.actions';
import { filter, first, Observable } from 'rxjs';
import {
  selectAuthLoading,
  selectAuthStatus,
} from '../../../../state/auth/auth.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { generalStatus } from '../../../../constants/global-constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent {
  form!: FormGroup;
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  status$: Observable<string | null> = this.store.select(selectAuthStatus);

  hide = signal(true);
  toggleHide() {
    this.hide.set(!this.hide());
  }

  constructor(
    public store: Store,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  submit() {
    const pass1 = this.form.get('newPassword')?.value;
    const pass2 = this.form.get('confirmPassword')?.value;
    if (pass1 !== pass2) {
      this.snackBar.open('Passwords do not match!', 'Dismiss', {
        duration: 3000,
      });
      return;
    }

    const payload = this.form.value;
    this.store.dispatch(
      updatePass({
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
      })
    );
    this.status$
      .pipe(
        filter((status) => status === generalStatus.SUCCESS),
        first()
      )
      .subscribe(() => this.dialogRef.close());
  }
}
