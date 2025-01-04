import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Message } from '../../../../../shared/interface/message';
import { Store } from '@ngrx/store';
import {
  deleteMessage,
  loadMessages,
  toggleArchive,
} from '../../../../../state/message/message.actions';
import { Observable } from 'rxjs';
import {
  selectMessageLoaded,
  selectMessageLoading,
  selectMessages,
} from '../../../../../state/message/message.selectors';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

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
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  @Input() archive: boolean = false;
  archiveButtonText: string = 'ARCHIVE';
  messages$: Observable<Message[]> = this.store.select(
    selectMessages(this.archive)
  );
  messageLoaded$: Observable<boolean> = this.store.select(selectMessageLoaded);
  loading$: Observable<boolean> = this.store.select(selectMessageLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.messageLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadMessages());
    });
  }

  ngOnChanges() {
    this.messages$ = this.store.select(selectMessages(this.archive));
    this.archiveButtonText = this.archive ? 'UNARCHIVE' : 'ARCHIVE';
  }

  archiveMessage(id: number) {
    this.store.dispatch(toggleArchive({ messageId: id }));
  }

  deleteMessage(id: number) {
    this.store.dispatch(deleteMessage({ messageId: id }));
  }
}
