import { User } from '../interface/user';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialUsersState: UserState = {
  users: [],
  loading: false,
  error: null,
};
