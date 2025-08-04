import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ]
})
export class SidebarComponent {

  constructor(
    private router: Router
  ) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
