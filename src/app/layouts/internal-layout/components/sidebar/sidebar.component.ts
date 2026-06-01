import { Component } from '@angular/core';
import { NavMenuComponent, NavMenuItemComponent } from '@shared/ds/nav-menu';

@Component({
  selector: 'app-internal-sidebar',
  imports: [NavMenuComponent, NavMenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
