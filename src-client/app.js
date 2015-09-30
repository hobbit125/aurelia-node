/* eslint-disable */
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import bootstrap from 'bootstrap';
import 'fetch';
import 'babel/polyfill';

/* eslint-enable */

/*
  This is the view model for our root application view
  This view model defines variables for the outer shell of
  the application and provides routes for populating and navigating
  between child pages rendered in the <router-view> on the
  corresponding view
 */
@inject(Router)
export class App {

  // The constructor takes in the singleton instanced router
  // from the framework (specified by the @inject) and configures it
  // with the routes that we want for the "pages" in our application
  constructor (router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Aurelia Node';
      config.map([
        { route : ['', 'home'], moduleId : './pages/home' }
      ]);
    });
  }
}
