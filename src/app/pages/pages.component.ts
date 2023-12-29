import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PaginateComponent } from '../shared/paginate/paginate.component';
@Component({
    selector: 'app-pages',
    standalone: true,
    templateUrl: './pages.component.html',
    styleUrl: './pages.component.css',
    imports: [HeaderComponent,SidebarComponent,
        BreadcrumbsComponent,PaginateComponent,FooterComponent,RouterOutlet,HttpClientModule]
})
export class PagesComponent {
  
}
