import { inject } from 'aurelia-framework';
import { WebServices } from '../lib/web-services';

/*
  This is a viewmodel for our simple demonstration
  page.  This viewmodel defines properties bound to the
  home view and provides actions for sending and receiving
  book data from the server.
 */
@inject(WebServices)
export class Home {

  // This constructor takes a singleton instance of our
  // webservices object.  This is injected to ensure that
  // we always receive the same copy of this object rather than
  // making a new one each time the view is rendered.
  constructor (webServices) {
    this.webServices = webServices;

    this.books = [];
    this.newTitle = '';
    this.newDescription = '';
  }

  // When the view is attached, we should load up our list of books from
  // the server
  async activate () {
    await this.loadBooks();
  }

  // This method requests books from the server and then stores
  // the returned list in this viewmodel's "books" property
  async loadBooks () {
    const result = await this.webServices.sendRequest('/api/books/list');

    this.books = result.books;
  }

  // This method sends a new book to the server to save to the
  // database, based on the newTitle and newDescription properties
  // provided by this class and bound to the textboxs in the view
  async addBook () {
    await this.webServices.sendRequest(
      '/api/books/save',
      { _id : this.newTitle, description : this.newDescription }
    );
    await this.loadBooks();
  }
}
