import { bootstrapApplication } from '@angular/platform-browser';
import { platformServer } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config, { platformRef: platformServer() });

export default bootstrap;
