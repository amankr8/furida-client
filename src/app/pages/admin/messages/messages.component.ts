import { Component } from '@angular/core';
import { MessageCardsComponent } from './components/message-cards/message-cards.component';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadMessages } from '../../../state/message/message.actions';
import {
  selectMessageLoaded,
  selectMessageLoading,
} from '../../../state/message/message.selectors';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    MessageCardsComponent,
    NavToolbarComponent,
    CommonModule,
    MatTabsModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  headerText: string = 'Inbox';
  buttonText: string = 'Archive Inbox';
  childLevelLink: string = 'read-messages';
  messageLoaded$: Observable<boolean> = this.store.select(selectMessageLoaded);
  loading$: Observable<boolean> = this.store.select(selectMessageLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.messageLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadMessages());
    });
  }
}
