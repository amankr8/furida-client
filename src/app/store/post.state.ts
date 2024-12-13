import { Post } from '../interface/post';

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export const initialPostsState: PostState = {
  posts: [],
  loading: false,
  error: null,
};
