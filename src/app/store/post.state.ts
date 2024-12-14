import { Post } from '../interface/post';

export interface PostState {
  posts: Post[];
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialPostsState: PostState = {
  posts: [],
  isLoaded: false,
  loading: false,
  error: null,
};
