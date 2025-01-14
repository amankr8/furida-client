import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Message } from '../../../../../shared/interface/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss',
})
export class MessageDialogComponent {
  message!: Message;

  constructor(
    public store: Store,
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Message
  ) {
    this.message = data;
  }
}
