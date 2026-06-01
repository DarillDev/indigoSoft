import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-internal-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly title = signal('Hello Indigo Soft!');
}
