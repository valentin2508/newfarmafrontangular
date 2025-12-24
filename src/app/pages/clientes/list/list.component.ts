import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.listar().subscribe((data: any) => { // Changed getClientes to listar and added type
      this.clientes = Object.values(data.list); // Access the 'list' property from ClienteList
    });
  }

  editCliente(id: number): void {
    this.router.navigate(['/dashboard/clientes/form', id]);
  }

  deleteCliente(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clienteService.eliminar(id).subscribe(() => { // Changed deleteCliente to eliminar
        this.loadClientes();
      });
    }
  }

  addCliente(): void {
    this.router.navigate(['/form']);
  }
}
