import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Post } from '../../../../../interface/post';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectPostLoaded,
  selectPostLoading,
  selectPosts,
} from '../../../../../state/post/post.selectors';
import {
  loadPosts,
  openViewDialog,
} from '../../../../../state/post/post.actions';

@Component({
  selector: 'app-updates',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatButtonModule, CommonModule],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.scss',
})
export class UpdatesComponent {
  posts$: Observable<Post[]> = this.store.select(selectPosts);
  postLoaded$: Observable<boolean> = this.store.select(selectPostLoaded);
  loading$: Observable<boolean> = this.store.select(selectPostLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.postLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadPosts());
    });
  }

  viewPost(id: number) {
    this.store.dispatch(openViewDialog({ postId: id }));
  }
}
