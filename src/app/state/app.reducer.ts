import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.state';
import { setRole, setSelectedId, clearState } from './app.actions';

export const appReducer = createReducer(
  initialAppState,
  on(setRole, (state, { role }) => ({ ...state, role })),
  on(setSelectedId, (state, { id }) => ({ ...state, selectedId: id })),
  on(clearState, () => initialAppState)
);
