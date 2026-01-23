import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CargoService } from '../../../services/cargo.service';
import { cargo } from '../../../models/cargo';

@Component({
  selector: 'app-cargos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class CargosListComponent implements OnInit {
  cargos: cargo[] = [];
  total: number = 0;
  page: number = 1;
  xpage: number = 10;

  constructor(private cargoService: CargoService) {}

  ngOnInit(): void {
    this.loadCargos();
  }

  loadCargos(): void {
    this.cargoService.List(this.page, this.xpage).subscribe({
      next: (data) => {
        this.cargos = data.list;
        this.total = data.total;
      },
      error: (err) => console.error('Error loading cargos', err)
    });
  }

  deleteCargo(id: number): void {
    if (confirm('¿Estás seguro de eliminar este cargo?')) {
      this.cargoService.eliminar(id).subscribe({
        next: () => this.loadCargos(),
        error: (err) => console.error('Error deleting cargo', err)
      });
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadCargos();
    }
  }

  nextPage(): void {
    if (this.page * this.xpage < this.total) {
      this.page++;
      this.loadCargos();
    }
  }
}