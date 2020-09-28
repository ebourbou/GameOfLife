import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import amplify from './aws-exports';
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure(amplify);
const isAuthenticated = () => Amplify.Auth.user !== null;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
