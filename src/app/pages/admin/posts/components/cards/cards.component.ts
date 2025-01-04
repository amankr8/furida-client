import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Post } from '../../../../../shared/interface/post';
import { Store } from '@ngrx/store';
import { first, map, Observable, tap } from 'rxjs';
import {
  selectPostLoaded,
  selectPostLoading,
  selectPosts,
} from '../../../../../state/post/post.selectors';
import {
  loadPosts,
  openDeleteDialog,
  openEditDialog,
} from '../../../../../state/post/post.actions';
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
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  posts$: Observable<Post[]> = this.store.select(selectPosts);
  loading$: Observable<boolean> = this.store.select(selectPostLoading);
  sortedPosts$: Observable<Post[]> = this.posts$.pipe(
    map((posts) =>
      [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    )
  );

  constructor(private store: Store) {}
}
