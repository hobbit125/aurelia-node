import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';

/*
  This is a helper class that wraps aurelia's fetch-client
  library to provide some default behavior for our requests

  In this configuration, all requests are sent as HTTP POSTs
  and we are always sending and receiving objects that should
  be serialized with JSON
*/
@inject(HttpClient)
export class WebServices {
  constructor (http) {
    this.http = http;
  }

  // Serialize an object and send it to the server, and return
  // a promise that will deserialize the server response JSON and
  // give us back an object
  sendRequest (path, request) {
    return this.http.fetch(
      path,
      {
        body : JSON.stringify(request) || null,
        headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        method : 'post',
        credentials : 'same-origin'
      }
    ).then(response => response.json());
  }
}
