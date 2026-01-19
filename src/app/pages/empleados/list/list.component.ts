import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpleadoService } from '../../../services/empleado.service';
import { Empleado } from '../../../models/empleado';

@Component({
  selector: 'app-empleados-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class EmpleadosListComponent implements OnInit {
  empleados: Empleado[] = [];
  total: number = 0;
  page: number = 1;
  xpage: number = 10;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados(): void {
    this.empleadoService.listar(this.page, this.xpage).subscribe({
      next: (data) => {
        debugger;
        console.log('Empleados data:', data);
        this.empleados = data.list;
        this.total = data.total;
      },
      error: (err) => console.error('Error loading empleados', err)
    });
  }

  deleteEmpleado(id: number): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.eliminar(id).subscribe({
        next: () => this.loadEmpleados(),
        error: (err) => console.error('Error deleting empleado', err)
      });
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadEmpleados();
    }
  }

  nextPage(): void {
    if (this.page * this.xpage < this.total) {
      this.page++;
      this.loadEmpleados();
    }
  }
}
