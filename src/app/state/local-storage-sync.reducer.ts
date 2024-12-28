import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { localStorageKeys } from '../constants/global-constants';

export function localStorageSyncReducer<T>(
  reducer: ActionReducer<T>
): ActionReducer<T> {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storedState = localStorage.getItem(localStorageKeys.ConfigState);
      if (storedState) {
        return JSON.parse(storedState);
      }
    }

    const nextState = reducer(state, action);

    // Save state to localStorage for any action except INIT and UPDATE
    localStorage.setItem(
      localStorageKeys.ConfigState,
      JSON.stringify(nextState)
    );

    return nextState;
  };
}
