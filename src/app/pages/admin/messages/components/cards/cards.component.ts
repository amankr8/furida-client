import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Message } from '../../../../../interface/message';
import { Store } from '@ngrx/store';
import {
  deleteMessage,
  loadMessages,
  toggleArchive,
} from '../../../../../store/actions/message.actions';
import { Observable } from 'rxjs';
import {
  selectError,
  selectIsMessageLoaded,
  selectLoading,
  selectMessages,
} from '../../../../../store/selectors/message.selectors';

@Component({
  selector: 'app-message-cards',
  standalone: true,
  imports: [MatProgressBarModule, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  @Input() archive: boolean = false;
  archiveButtonText: string = 'ARCHIVE';
  messages$: Observable<Message[]> = this.store.select(
    selectMessages(this.archive)
  );
  isMessageLoaded$: Observable<boolean> = this.store.select(
    selectIsMessageLoaded
  );
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);

  constructor(private store: Store) {}

  ngOnInit() {
    this.isMessageLoaded$.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadMessages());
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
