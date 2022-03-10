import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mis-vacunas';
  public companies: MenuItem[] = [
    { url: '/home', nombre: 'home' },
    { url: '/vacunas', nombre: 'vacunas' }
    
  ];

  
}
