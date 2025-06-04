import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: '<h1>Server-Side API Response:</h1><pre>{{ response | json }}</pre>',
})
export class AppComponent implements OnInit {
  response: any;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.http.get('https://jsonplaceholder.typicode.com/posts/1')
        .subscribe(data => this.response = data);
    }
  }
}