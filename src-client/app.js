import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Router} from 'aurelia-router';

@inject(Router, HttpClient)
export class App {
  constructor (router, http) {
    this.http = http.configure(x => {
      x.withHeader('Content-Type', 'application/json');
      x.withCredentials(true);
    });
    this.router = router;
    this.router.configure(config => {
      config.title = 'Aurelia Node';
      config.map([
        { route: ['','home'], moduleId: './pages/home' }
      ]);
    });
  }
}
