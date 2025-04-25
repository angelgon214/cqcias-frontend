import { Routes } from '@angular/router';
import { ProductListComponent } from './productos-edit/productos-edit.component';
import { ProductFormComponent } from './productos-view/productos-view.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'create', component: ProductFormComponent },
  { path: 'edit/:id', component: ProductFormComponent },
];
