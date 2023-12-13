import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-pages',
    standalone: true,
    templateUrl: './pages.component.html',
    styleUrl: './pages.component.css',
    imports: [HeaderComponent,SidebarComponent,
        BreadcrumbsComponent,FooterComponent,RouterOutlet]
})
export class PagesComponent {
  
}
