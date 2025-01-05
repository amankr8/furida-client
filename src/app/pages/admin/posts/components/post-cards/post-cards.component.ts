import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Post } from '../../../../../shared/interface/post';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {
  selectPostLoading,
  selectPosts,
} from '../../../../../state/post/post.selectors';
import { MatIconModule } from '@angular/material/icon';
import { PostCardComponent } from '../../../../components/post-card/post-card.component';

@Component({
  selector: 'app-post-cards',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    PostCardComponent,
  ],
  templateUrl: './post-cards.component.html',
  styleUrl: './post-cards.component.scss',
})
export class PostCardsComponent {
  posts$: Observable<Post[]> = this.store.select(selectPosts);
  loading$: Observable<boolean> = this.store.select(selectPostLoading);

  constructor(private store: Store) {}
}
