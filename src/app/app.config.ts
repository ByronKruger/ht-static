import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideHttpClient(),
    // provideHttpClient(withFetch()),               // required for SSR / prerender
    provideClientHydration(
      withHttpTransferCacheOptions({              // automatic TransferState for GET requests
        includePostRequests: false
      })
    )
  ]
};
