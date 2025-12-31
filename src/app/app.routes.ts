import { Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosListComponent } from './pages/productos/list/productosList.component';

import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrdersComponent } from './pages/orders/orders.component';

import { productFormComponent } from './pages/productos/edit/productForm.component';
import { VentaComponent } from './pages/ventas/ventas/ventas.component';
import { ModalVentasComponent } from './pages/modal/modal-ventas/modal-ventas.component';
import { ClientFormComponent } from './pages/client-form/client-form.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ClienteListComponent } from './pages/clientes/list/list.component';
import { ClienteFormComponent } from './pages/clientes/form/form.component';
import { ProveedorListComponent } from './pages/proveedores/list/list.component';
import { ProveedorFormComponent } from './pages/proveedores/form/form.component';

export const routes: Routes = [
    {path: "",component: LoginComponent},
    //{path: "login", component: LoginComponent},
    //{path: "register", component: RegisterComponent},
    //{path: "dashboard",
       // children: 
       // [
       //     {path: '', component: DashboardComponent},
      //      {path: 'usuarios', component: UsuariosComponent},
     //   ]
    //},
    {path:"home", component: HomeComponent},
    {path:"cart", component: CartComponent},
    {path:"orders", component: OrdersComponent},
    {path:"reports", component: ReportsComponent},
    //{path:"clientes", component: ClientFormComponent},
    {path:"ventas", component: VentaComponent},
    {path:"clientes", component: ClienteListComponent},
    { path: 'form', component: ClienteFormComponent },//nuevo cliente o editar cliente
    { path: 'client-form', component: ClientFormComponent },//este es para el formulario de cliente al hacer venta
    {path: 'proveedores',component: ProveedorListComponent, data: { title: 'Proveedores' }},
    {path: 'proveedores-form', component: ProveedorFormComponent },//nuevo proveedor o editar proveedor
     { path: "add", component: productFormComponent },
     {
         path:"edit/:id",
         component:productFormComponent
     },
   { path: "productos", component: ProductosListComponent },
    {path: "**",component:NopageFoundComponent},
    
];
