import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectSelectedCategoryId = createSelector(
  selectAppState,
  (state: AppState) => state.selectedId
  
);

export const selectTotalUsers = createSelector(
  selectAppState,
  (state: AppState) => state.totalUsers
);

export const selectTotalProducts = createSelector(
  selectAppState,
  (state: AppState) => state.totalProducts
);
