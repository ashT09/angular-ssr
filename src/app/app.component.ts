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
    <ng-container *ngFor="let r of responses">
      <pre>{{ r | json }}</pre>
    </ng-container>
  `
})
export class AppComponent {
  responses: any[] = [];
  constructor(private http: HttpClient) {}

  load() {
    this.http.get('/api/data').subscribe(r => this.responses.push(r));
  }
}
