import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideAuth0({
          domain: 'dev-1y5irx68y0mdly6w.us.auth0.com',
          clientId: 'w1GmXzqEogfv7N8y3tW3IqZgilzFdlRj',
          authorizationParams: {
            redirect_uri: 'http://localhost:4200'
          }
        }),
  ]
};
