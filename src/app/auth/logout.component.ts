import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: '',
  imports: []
})
export class LogoutComponent implements OnInit {
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // Forzar logout y redirección al login
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }
}