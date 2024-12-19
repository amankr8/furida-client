import { Component, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UpdateProjectComponent } from '../../projects/update-project/update-project.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { updatePass } from '../../../../state/auth/auth.actions';
import { filter, first, map, Observable, tap } from 'rxjs';
import {
  selectAuthLoading,
  selectUpdatePassStatus,
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
  updatePassStatus: Observable<string | null> = this.store.select(
    selectUpdatePassStatus
  );

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    public store: Store,
    public dialogRef: MatDialogRef<UpdateProjectComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
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
    this.updatePassStatus
      .pipe(
        filter((status) => status === generalStatus.SUCCESS),
        first(),
        tap(() => {
          this.dialogRef.close();
        })
      )
      .subscribe();
  }
}
