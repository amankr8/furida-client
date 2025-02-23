import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Message } from '../../../../../shared/interface/message';
import { Store } from '@ngrx/store';
import {
  deleteMessage,
  toggleArchive,
} from '../../../../../state/message/message.actions';
import { map, Observable } from 'rxjs';
import {
  selectMessageLoading,
  selectMessages,
} from '../../../../../state/message/message.selectors';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-message-cards',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './message-cards.component.html',
  styleUrl: './message-cards.component.scss',
})
export class MessageCardsComponent {
  @Input() archive: boolean = false;
  readonly matDialog = inject(MatDialog);
  archiveButtonText: string = 'ARCHIVE';
  messages$!: Observable<Message[]>;
  loading$: Observable<boolean> = this.store.select(selectMessageLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.messages$ = this.store
      .select(selectMessages)
      .pipe(
        map((messages) =>
          messages.filter((message) => message.archive === this.archive)
        )
      );
    this.archiveButtonText = this.archive ? 'UNARCHIVE' : 'ARCHIVE';
  }

  openMessage(message: Message) {
    this.matDialog.open(MessageDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: message,
    });
  }

  archiveMessage(id: number) {
    this.store.dispatch(toggleArchive({ messageId: id }));
  }

  deleteMessage(id: number) {
    this.store.dispatch(deleteMessage({ messageId: id }));
  }
}
