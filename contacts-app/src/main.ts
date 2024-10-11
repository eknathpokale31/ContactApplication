import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


// Enable production mode if the environment is production
if (environment.production) {
    enableProdMode();
}

// Bootstrap the application with the root module
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));