import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ds-nav-menu-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-menu-item.component.html',
  styleUrl: './nav-menu-item.component.scss',
})
export class NavMenuItemComponent {
  public readonly link = input.required<string>();
  public readonly label = input.required<string>();
}
