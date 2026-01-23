import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LaboratorioService } from '../../../services/laboratorio.service';
import { Laboratorio } from '../../../models/laboratorio';

@Component({
  selector: 'app-laboratorios-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class LaboratoriosListComponent implements OnInit {
  laboratorios: Laboratorio[] = [];
  total: number = 0;
  page: number = 1;
  xpage: number = 10;

  constructor(private laboratorioService: LaboratorioService) {}

  ngOnInit(): void {
    this.loadLaboratorios();
  }

  loadLaboratorios(): void {
    this.laboratorioService.List(this.page, this.xpage).subscribe({
      next: (data) => {
        this.laboratorios = data.list;
        this.total = data.total;
      },
      error: (err) => console.error('Error loading laboratorios', err)
    });
  }

  deleteLaboratorio(id: number): void {
    if (confirm('¿Estás seguro de eliminar este laboratorio?')) {
      this.laboratorioService.eliminar(id).subscribe({
        next: () => this.loadLaboratorios(),
        error: (err) => console.error('Error deleting laboratorio', err)
      });
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadLaboratorios();
    }
  }

  nextPage(): void {
    if (this.page * this.xpage < this.total) {
      this.page++;
      this.loadLaboratorios();
    }
  }
}