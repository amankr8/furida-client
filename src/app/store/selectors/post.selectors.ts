import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from '../post.state';

export const selectPostsState = createFeatureSelector<PostState>('posts');

export const selectPostById = (id: number) =>
  createSelector(selectPostsState, (state) =>
    state.posts.find((doc) => doc.id === id)
  );

export const selectPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);

export const selectLoading = createSelector(
  selectPostsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectPostsState,
  (state) => state.error
);
