import { createAction, props } from '@ngrx/store';

export const setRole = createAction('[App] Set Role', props<{ role: 'Admin' | 'Vendor' }>());
export const setSelectedId = createAction('[App] Set Selected Id', props<{ id: number }>());
export const totalUsers = createAction('[App] Total Users', props<{ total: number }>());
export const totalProducts = createAction('[App] Total Products', props<{ total: number }>());
export const clearState = createAction('[App] Clear State');
