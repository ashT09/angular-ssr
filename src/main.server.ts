import { renderApplication } from '@angular/platform-server';
import { provideServerRendering } from '@angular/ssr';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';

export function render(options: { document: string; url: string; providers: any[] }) {
  return renderApplication(
    () => bootstrapApplication(AppComponent, { providers: options.providers }),
    { document: options.document, url: options.url }
  );
}
