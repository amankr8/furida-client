import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-updates',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.scss',
})
export class UpdatesComponent {
  posts$: Observable<Post[]> = this.store.select(selectPosts);
  postLoaded$: Observable<boolean> = this.store.select(selectPostLoaded);
  loading$: Observable<boolean> = this.store.select(selectPostLoading);

  selectedPost: Post | null = null;
  isModalVisible = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.postLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadPosts());
    });
  }

  viewPost(post: Post) {
    //this.store.dispatch(openViewDialog({ postId: id }));
    this.selectedPost = post;
    this.isModalVisible = true;
  }

  closeModal() {
    this.selectedPost = null;
    this.isModalVisible = false;
  }
}
