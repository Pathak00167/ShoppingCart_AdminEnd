import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './custom.interceptor';
import { provideStore, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { appReducer } from './state/app.reducer'; // 👈 your reducer

// 🔁 Sync reducer with localStorage
export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['app'],     // 👈 name of your store slice
    rehydrate: true,
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideToastr(),
    provideHttpClient(withInterceptors([customInterceptor])),

    // ✅ Provide NgRx Store with persistence
    provideStore(
      { app: appReducer },
      { metaReducers }
    ),
  ],
};
