import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PagesComponent } from './pages/pages.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NewFarmaProject';
}
