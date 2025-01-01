import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../../interface/post';
import { Store } from '@ngrx/store';
import {
  openDeleteDialog,
  openEditDialog,
  openViewDialog,
} from '../../../state/post/post.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { selectPostLoading } from '../../../state/post/post.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() post!: Post;
  loading$: Observable<boolean> = this.store.select(selectPostLoading);

  constructor(private store: Store) {}

  viewPost() {
    this.store.dispatch(openViewDialog({ postId: this.post.id }));
  }

  updatePost() {
    this.store.dispatch(openEditDialog({ postId: this.post.id }));
  }

  deletePost() {
    this.store.dispatch(openDeleteDialog({ postId: this.post.id }));
  }
}
