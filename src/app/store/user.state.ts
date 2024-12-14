import { User } from '../interface/user';

export interface UserState {
  users: User[];
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialUsersState: UserState = {
  users: [],
  isLoaded: false,
  loading: false,
  error: null,
};
