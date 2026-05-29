import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-internal-layout',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './internal-layout.component.html',
  styleUrl: './internal-layout.component.scss',
})
export class InternalLayoutComponent {}
