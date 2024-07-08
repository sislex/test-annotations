import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/containers/app/app.config';
import { AppComponent } from './app/containers/app/app.component';
import {provideHttpClient} from '@angular/common/http';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
