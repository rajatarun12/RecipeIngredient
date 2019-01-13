import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

let app = function(){
  // Application Constructor
    const initialize =  function() {
      document.addEventListener('deviceready', onDeviceReady.bind(this), false);
      if (environment.dev) {
        receivedEvent('deviceready');
      }
    };

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    const onDeviceReady = function() {
      delete window.open;
      // @ts-ignore
      window.open = cordova.InAppBrowser.open;
      receivedEvent('deviceready');
    };
    // Update DOM on a Received Event
    const receivedEvent =  function(id) {
      if ( id = 'deviceready') {
        platformBrowserDynamic().bootstrapModule(AppModule)
          .catch(err => console.log(err));
      }
    };
    initialize();
};

app();

