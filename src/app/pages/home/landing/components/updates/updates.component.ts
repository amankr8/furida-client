import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Post } from '../../../../../interface/post';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectPostLoading,
  selectPosts,
} from '../../../../../state/post/post.selectors';
import { MatIconModule } from '@angular/material/icon';
import { PostCardComponent } from '../../../../components/post-card/post-card.component';

@Component({
  selector: 'app-updates',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    PostCardComponent,
  ],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.scss',
})
export class UpdatesComponent {
  posts$: Observable<Post[]> = this.store.select(selectPosts);
  loading$: Observable<boolean> = this.store.select(selectPostLoading);

  constructor(private store: Store) {}
}
