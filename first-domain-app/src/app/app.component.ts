import { Component } from '@angular/core';

declare let CrossStorageHub: any;
declare let CrossStorageClient: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  localStorageItem: string;
  crossDomainItem: string;
  crossStorage: any;

  constructor() {
    CrossStorageHub.init([
      { origin: /localhost:4200$/, allow: ['get', 'set', 'del', 'getKeys', 'clear'] },
      { origin: /localhost:3000$/, allow: ['get', 'set', 'del', 'getKeys', 'clear'] }
    ]);
    this.crossStorage = new CrossStorageClient('http://localhost:3000/hub.html');

  }

  getLocalStorage() {
    this.localStorageItem = localStorage.getItem('local-item');
  }

  getCrossStorage() {
    this.crossDomainItem = this.crossStorage.onConnect().then(() => {
      return this.crossStorage.get('cross-domain-item');
    });
  }

  setLocalStorage() {
    localStorage.setItem('local-item', 'app111 item local');
  }

  setCrossStorage() {
    this.crossStorage.onConnect().then(() => {
      return this.crossStorage.set('cross-domain-item', 'app11111 item compartilhado');
    });
  }
}
