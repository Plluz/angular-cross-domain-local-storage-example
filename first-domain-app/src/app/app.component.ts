import { Component } from '@angular/core';

declare let CrossStorageHub: any;
declare let CrossStorageClient: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  crossStorage: any;

  constructor() {
    CrossStorageHub.init([
      { origin: /localhost:4200$/, allow: ['set'] },
      { origin: /localhost:3000$/, allow: ['get', 'getKeys'] }
    ]);
    this.crossStorage = new CrossStorageClient('http://localhost:3000/hub.html');
  }

  setCrossStorage() {
    this.crossStorage.onConnect().then(() => this.crossStorage.set('cross-domain-item', 'compartilhado ' + new Date()));
  }
}
