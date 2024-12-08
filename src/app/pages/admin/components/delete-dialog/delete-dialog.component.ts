import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatDialogClose, MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent {
  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { action: any }
  ) {}

  confirm() {
    this.store.dispatch(this.data.action);
    this.dialogRef.close();
  }
}
