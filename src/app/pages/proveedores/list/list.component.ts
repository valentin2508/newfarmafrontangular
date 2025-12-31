import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Proveedor } from '../../../models/proveedor';
import { ProveedorService } from '../../../services/proveedor.service';

@Component({
  selector: 'app-proveedor-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ProveedorListComponent implements OnInit {
  proveedores: any[] = [];
  page: number = 1;
  xpage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private proveedorService: ProveedorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(): void {
    this.proveedorService.listar(this.page, this.xpage).subscribe((data: any) => {
      this.proveedores = data.list;
      this.totalItems = data.total;
      this.totalPages = Math.ceil(this.totalItems / this.xpage);
    });
  }

  nextPage(): void {
    if ((this.page * this.xpage) < this.totalItems) {
      this.page++;
      this.loadProveedores();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProveedores();
    }
  }

  editProveedor(id: number): void {
    this.router.navigate(['proveedores-form', {id}]);
  }

  deleteProveedor(id: number): void {
    if (confirm('Are you sure you want to delete this proveedor?')) {
      this.proveedorService.eliminar(id).subscribe(() => { 
        this.loadProveedores();
      });
    }
  }

  addProveedor(): void {
    this.router.navigate(['proveedores-form']);
  }
}
