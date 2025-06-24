export interface AppState {
  role: 'Admin' | 'Vendor' | null;
  selectedId: number | null;
}

export const initialAppState: AppState = {
  role: null,
  selectedId: null
};
