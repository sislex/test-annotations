import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { VIEW_FEATURE_KEY, viewReducer } from "../../+state/view/view.reducer";
import { provideHttpClient } from '@angular/common/http';
import { DOCUMENT_FEATURE_KEY, documentReducer } from "../../+state/document/document.reducer";
import  {DocumentEffects } from "../../+state/document/document.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(
      [
        DocumentEffects,
      ]
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(VIEW_FEATURE_KEY, viewReducer),
    provideState(DOCUMENT_FEATURE_KEY, documentReducer),
    provideRouterStore()
  ]
};
