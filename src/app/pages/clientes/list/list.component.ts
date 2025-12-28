import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cliente, ClienteList } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: any[] = [];
  page: number = 1;
  xpage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.listar(this.page, this.xpage).subscribe((data: any) => {
      this.clientes = data.list;
      this.totalItems = data.total;
      this.totalPages = Math.ceil(this.totalItems / this.xpage);
    });
  }

  nextPage(): void {
    if ((this.page * this.xpage) < this.totalItems) {
      this.page++;
      this.loadClientes();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadClientes();
    }
  }

  editCliente(id: number): void {
    this.router.navigate(['form', id], { relativeTo: this.route.parent });
  }

  deleteCliente(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clienteService.eliminar(id).subscribe(() => { 
        this.loadClientes();
      });
    }
  }

  addCliente(): void {
    this.router.navigate(['form'], { relativeTo: this.route.parent });
  }
}
