import { Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    {path: "",component: LoginComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    
    {path: "dashboard",
    children: 
        [
            {path: '', component: DashboardComponent},
            {path: 'usuarios', component: UsuariosComponent},
            {path: 'productos', component: ProductosComponent}
        ]
    },
    {path: "**",component:NopageFoundComponent},
];
