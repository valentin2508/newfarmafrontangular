import { Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosListComponent } from './pages/productos/list/productosList.component';

import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';

import { productFormComponent } from './pages/productos/edit/productForm.component';
import { VentaComponent } from './pages/ventas/ventas/ventas.component';
import { ModalVentasComponent } from './pages/modal/modal-ventas/modal-ventas.component';

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
   
    {path:"ventas", component: VentaComponent},
    { path: "add", component: productFormComponent,data: { renderMode: 'ssr' } },
    {
        path:"edit/:id",
        component:productFormComponent,
        data: { renderMode: 'ssr' }
    },
  { path: "productos", component: ProductosListComponent,data: { renderMode: 'ssr' } },
    {path: "**",component:NopageFoundComponent},
    
];
