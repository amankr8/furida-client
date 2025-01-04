import { Component } from '@angular/core';
import { CardsComponent } from './components/cards/cards.component';
import { CommonModule } from '@angular/common';
import { NavToolbarComponent } from '../components/nav-toolbar/nav-toolbar.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPosts } from '../../../state/post/post.actions';
import {
  selectPostLoaded,
  selectPostLoading,
} from '../../../state/post/post.selectors';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CardsComponent,
    CommonModule,
    NavToolbarComponent,
    MatProgressBarModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  headerText: string = 'Your Posts';
  buttonText: string = 'Create Post';
  childLevelLink: string = 'create-post';

  postLoaded$: Observable<boolean> = this.store.select(selectPostLoaded);
  loading$: Observable<boolean> = this.store.select(selectPostLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.postLoaded$.subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadPosts());
    });
  }
}
