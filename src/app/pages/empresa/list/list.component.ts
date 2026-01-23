import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { empresa } from '../../../models/empresa';

@Component({
  selector: 'app-empresas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class EmpresasListComponent implements OnInit {
  empresas: empresa[] = [];
  total: number = 0;
  page: number = 1;
  xpage: number = 10;

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas(): void {
    this.empresaService.List(this.page, this.xpage).subscribe({
      next: (data) => {
        this.empresas = data.list;
        this.total = data.total;
      },
      error: (err) => console.error('Error loading empresas', err)
    });
  }

  deleteEmpresa(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta empresa?')) {
      this.empresaService.eliminar(id).subscribe({
        next: () => this.loadEmpresas(),
        error: (err) => console.error('Error deleting empresa', err)
      });
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadEmpresas();
    }
  }

  nextPage(): void {
    if (this.page * this.xpage < this.total) {
      this.page++;
      this.loadEmpresas();
    }
  }
}