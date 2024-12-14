import { createAction, props } from '@ngrx/store';
import { Post } from '../../interface/post';

export const loadPosts = createAction('[Posts] Load Posts');

export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[] }>()
);

export const loadPostsFail = createAction(
  '[Posts] Load Posts Fail',
  props<{ error: string }>()
);

export const addPost = createAction(
  '[Posts] Add Post',
  props<{ post: FormData }>()
);

export const addPostSuccess = createAction(
  '[Posts] Add Post Success',
  props<{ post: Post }>()
);

export const addPostFail = createAction(
  '[Posts] Add Post Fail',
  props<{ error: string }>()
);

export const openEditDialog = createAction(
  '[Post] Open Edit Dialog',
  props<{ postId: number }>()
);

export const updatePost = createAction(
  '[Posts] Update Post',
  props<{ postId: number; post: FormData }>()
);

export const updatePostSuccess = createAction(
  '[Posts] Update Post Success',
  props<{ post: Post }>()
);

export const updatePostFail = createAction(
  '[Posts] Update Post Fail',
  props<{ error: string }>()
);

export const openDeleteDialog = createAction(
  '[Post] Open Delete Dialog',
  props<{ postId: number }>()
);

export const deletePost = createAction(
  '[Post] Delete Post',
  props<{ postId: number }>()
);

export const deletePostSuccess = createAction(
  '[Post] Delete Post Success',
  props<{ postId: number }>()
);

export const deletePostFail = createAction(
  '[Post] Delete Post Fail',
  props<{ error: string }>()
);
