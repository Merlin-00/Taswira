import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // Détection des changements de zone avec coalescence des événements
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Configuration du routeur avec liaison des entrées des composants et défilement en mémoire
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    // Hydratation du client avec relecture des événements
    provideClientHydration(withEventReplay()),
    // Fourniture du client HTTP avec prise en charge de fetch
    provideHttpClient(withFetch()),
  ],
};
