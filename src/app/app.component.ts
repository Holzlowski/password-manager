import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SiteListComponent } from "./site-list/site-list.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent,SiteListComponent, SiteListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'password-manager';
}
