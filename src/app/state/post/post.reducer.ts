import { createReducer, on } from '@ngrx/store';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFail,
  addPost,
  addPostSuccess,
  addPostFail,
  updatePost,
  updatePostSuccess,
  updatePostFail,
  deletePost,
  deletePostSuccess,
  deletePostFail,
} from './post.actions';
import { Post } from '../../shared/interface/post';

export interface PostState {
  posts: Post[];
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialPostsState: PostState = {
  posts: [],
  loaded: false,
  loading: false,
  error: null,
};

export const postReducer = createReducer(
  initialPostsState,
  on(loadPosts, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    loaded: true,
    loading: false,
  })),

  on(loadPostsFail, (state, { error }) => ({
    ...state,
    error,
    loaded: false,
    loading: false,
  })),

  on(addPost, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(addPostSuccess, (state, { post }) => ({
    ...state,
    posts: [post, ...state.posts],
    loading: false,
  })),

  on(addPostFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(updatePost, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(updatePostSuccess, (state, { post }) => ({
    ...state,
    posts: state.posts.map((p) => (p.id === post.id ? post : p)),
    loading: false,
  })),

  on(updatePostFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(deletePost, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(deletePostSuccess, (state, { postId }) => ({
    ...state,
    posts: state.posts.filter((post) => post.id !== postId),
    loading: false,
  })),

  on(deletePostFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
