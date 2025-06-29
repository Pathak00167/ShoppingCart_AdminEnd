export interface AppState {
  role: 'Admin' | 'Vendor' | null;
  selectedId: number | null;
  totalUsers?: number;
  totalProducts?: number;
}

export const initialAppState: AppState = {
  role: null,
  selectedId: null,
   totalUsers: 0,
   totalProducts: 0
};
