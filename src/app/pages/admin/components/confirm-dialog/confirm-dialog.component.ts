import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Action, Store } from '@ngrx/store';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogClose, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  constructor(
    public store: Store,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { action: Action; message: string }
  ) {}

  confirm() {
    this.store.dispatch(this.data.action);
    this.dialogRef.close();
  }
}
