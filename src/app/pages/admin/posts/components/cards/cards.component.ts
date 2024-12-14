import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Post } from '../../../../../interface/post';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectIsPostLoaded,
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
  posts$: Observable<Post[]> = this.store.select(selectPosts);
  isPostLoaded: Observable<boolean> = this.store.select(selectIsPostLoaded);
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.isPostLoaded.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadPosts());
    });
  }

  update(id: number) {
    this.store.dispatch(openEditDialog({ postId: id }));
  }

  delete(id: number) {
    this.store.dispatch(openDeleteDialog({ postId: id }));
  }
}
