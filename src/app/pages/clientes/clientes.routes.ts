import { Routes } from '@angular/router';
import { ClienteListComponent } from './list/list.component';
import { ClienteFormComponent } from './form/form.component';

export const CLIENTES_ROUTES: Routes = [
  { path: '', component: ClienteListComponent },
  { path: 'list', redirectTo: '', pathMatch: 'full' },
  { path: 'form', component: ClienteFormComponent },
  { path: 'form/:id', component: ClienteFormComponent },
];
