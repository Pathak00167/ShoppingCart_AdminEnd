import { createAction, props } from '@ngrx/store';

export const setRole = createAction('[App] Set Role', props<{ role: 'Admin' | 'Vendor' }>());
export const setSelectedId = createAction('[App] Set Selected Id', props<{ id: number }>());
export const clearState = createAction('[App] Clear State');
