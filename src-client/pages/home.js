import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Home {
  constructor (http) {
    this.http = http;

    this.books = [];
    this.newTitle = '';
    this.newDescription = '';
  }

  activate () {
    this.loadBooks();
  }

  loadBooks () {
    return this.http.post('/api/books/list').then(response => {
      this.books = response.content.books;
    });
  }

  addBook () {
    return this.http.post('/api/books/save', { _id: this.newTitle, description: this.newDescription }).then(response => {
      this.loadBooks();
    });
  }
}
