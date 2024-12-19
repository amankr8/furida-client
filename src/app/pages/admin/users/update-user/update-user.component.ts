import { Component } from '@angular/core';
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
import { map, Observable } from 'rxjs';
import {
  selectAuthLoading,
  selectUpdatePassStatus,
} from '../../../../state/auth/auth.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { generalStatus } from '../../../../constants/global-constants';

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

  constructor(
    public store: Store,
    public dialogRef: MatDialogRef<UpdateProjectComponent>
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      reTypedPassword: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    const payload = this.form.value;
    this.store.dispatch(
      updatePass({
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
      })
    );
    this.updatePassStatus
      .pipe(
        map((status) =>
          status === generalStatus.SUCCESS ? this.dialogRef.close() : null
        )
      )
      .subscribe();
  }
}
