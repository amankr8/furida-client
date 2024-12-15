import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Post } from '../../../../interface/post';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectIsPostLoaded,
  selectPosts,
} from '../../../../store/selectors/post.selectors';
import { selectLoading } from '../../../../store/selectors/project.selectors';
import {
  loadPosts,
  openViewDialog,
} from '../../../../store/actions/post.actions';

@Component({
  selector: 'app-updates',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatButtonModule, CommonModule],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.scss',
})
export class UpdatesComponent {
  posts$: Observable<Post[]> = this.store.select(selectPosts);
  isPostLoaded$: Observable<boolean> = this.store.select(selectIsPostLoaded);
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.isPostLoaded$.subscribe((isLoaded) => {
      if (!isLoaded) this.store.dispatch(loadPosts());
    });
  }

  viewPost(id: number) {
    this.store.dispatch(openViewDialog({ postId: id }));
  }
}
