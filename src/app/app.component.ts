import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <h1>Server Response</h1>
    <button (click)="load()">Load Data</button>
    <pre>{{ response | json }}</pre>
  `
})
export class AppComponent {
  response: any;
  constructor(private http: HttpClient) {}

  load() {
    this.http.get('/api/data').subscribe(r => this.response = r);
  }
}
