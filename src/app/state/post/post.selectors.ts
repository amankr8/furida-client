import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';

export const selectPostsState = createFeatureSelector<PostState>('posts');

export const selectPostById = (id: number) =>
  createSelector(selectPostsState, (state) =>
    state.posts.find((post) => post.id === id)
  );

export const selectPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);

export const selectIsPostLoaded = createSelector(
  selectPostsState,
  (state) => state.isLoaded
);

export const selectLoading = createSelector(
  selectPostsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectPostsState,
  (state) => state.error
);
