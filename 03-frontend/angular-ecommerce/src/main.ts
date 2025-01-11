import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import '@angular/localize/init';
import { provideAuth0 } from '@auth0/auth0-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    // provideAuth0({
    //   domain: 'dev-1y5irx68y0mdly6w.us.auth0.com',
    //   clientId: 'w1GmXzqEogfv7N8y3tW3IqZgilzFdlRj',
    //   authorizationParams: {
    //     redirect_uri: window.location.origin
    //   }
    // }),
  ],
}).catch((err) => console.error(err));
