import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Post } from '../../../../../interface/post';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectLoading,
  selectPosts,
} from '../../../../../store/selectors/post.selectors';
import {
  loadPosts,
  openDeleteDialog,
  openEditDialog,
} from '../../../../../store/actions/post.actions';

@Component({
  selector: 'app-post-cards',
  standalone: true,
  imports: [MatProgressBarModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.posts$ = this.store.select(selectPosts);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }

  update(id: number) {
    this.store.dispatch(openEditDialog({ postId: id }));
  }

  delete(id: number) {
    this.store.dispatch(openDeleteDialog({ postId: id }));
  }
}
