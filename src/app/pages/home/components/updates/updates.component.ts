import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Post } from '../../../../interface/post';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPosts } from '../../../../store/selectors/post.selectors';
import { selectLoading } from '../../../../store/selectors/project.selectors';
import { loadPosts } from '../../../../store/actions/post.actions';

@Component({
  selector: 'app-updates',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatButtonModule, CommonModule],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.scss',
})
export class UpdatesComponent {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.posts$ = this.store.select(selectPosts);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }
}
