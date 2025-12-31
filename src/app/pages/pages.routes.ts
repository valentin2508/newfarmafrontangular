import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProveedorListComponent } from './proveedores/list/list.component';
// import { VentasComponent } from './ventas/ventas.component'; // Commented out

export const PAGES_ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'pedidos', component: OrdersComponent, data: { title: 'Generar Pedidos' } },
            { path: 'cart', component: CartComponent, data: { title: 'Carrito de compras' } },
            { path: 'home', component: HomeComponent, data: { title: 'Home' } },
            // { path: 'ventas', component: VentasComponent, data: { title: 'Ventas' } }, // Commented out
            {
                path: 'clientes',
                loadChildren: () => import('./clientes/clientes.routes').then(m => m.CLIENTES_ROUTES),
                data: { title: 'Clientes' }
            },
            // Additional child routes can be added here},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];
