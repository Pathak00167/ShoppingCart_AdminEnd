import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.state';
import { setRole, setSelectedId, clearState,totalUsers,totalProducts } from './app.actions';

export const appReducer = createReducer(
  initialAppState,
  on(setRole, (state, { role }) => ({ ...state, role })),
  on(setSelectedId, (state, { id }) => ({ ...state, selectedId: id })),
  // Add other actions as needed
  on(totalUsers, (state, { total }) => ({ ...state, totalUsers: total })),
  on(totalProducts, (state, { total }) => ({ ...state, totalProducts:total })),
  on(clearState, () => initialAppState)
);
