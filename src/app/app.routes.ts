import { Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/list/productos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ComprasComponent } from './pages/compras/compras.component';

export const routes: Routes = [
    {path: "",component: LoginComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "dashboard",
    children: 
        [
            {path: '', component: DashboardComponent},
            {path: 'usuarios', component: UsuariosComponent},
        ]
    },
    {path: 'productos', component: ProductosComponent},
    {path:"home", component: HomeComponent},
    {path:"compras", component: ComprasComponent},
    {path: "**",component:NopageFoundComponent},
];
