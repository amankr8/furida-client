import { User } from '../interface/user';

export interface AuthState {
  user: User | null;
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  loaded: false,
  loading: false,
  error: null,
};
