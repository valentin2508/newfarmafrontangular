import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnidadmedidaService } from '../../../services/unidadmedida.service';
import { UnidadMedida } from '../../../models/unidadmedida';

@Component({
  selector: 'app-unidadesmedida-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class UnidadesmedidaListComponent implements OnInit {
  unidadesmedida: UnidadMedida[] = [];
  total: number = 0;
  page: number = 1;
  xpage: number = 10;

  constructor(private unidadmedidaService: UnidadmedidaService) {}

  ngOnInit(): void {
    this.loadUnidadesMedida();
  }

  loadUnidadesMedida(): void {
    this.unidadmedidaService.List(this.page, this.xpage).subscribe({
      next: (data) => {
        this.unidadesmedida = data.list;
        this.total = data.total;
      },
      error: (err) => console.error('Error loading unidadesmedida', err)
    });
  }

  deleteUnidadMedida(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta unidad de medida?')) {
      this.unidadmedidaService.eliminar(id).subscribe({
        next: () => this.loadUnidadesMedida(),
        error: (err) => console.error('Error deleting unidadmedida', err)
      });
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadUnidadesMedida();
    }
  }

  nextPage(): void {
    if (this.page * this.xpage < this.total) {
      this.page++;
      this.loadUnidadesMedida();
    }
  }
}