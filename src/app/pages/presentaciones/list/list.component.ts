import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PresentacionService } from '../../../services/presentacion.service';
import { Presentacion } from '../../../models/presentacion';

@Component({
  selector: 'app-presentaciones-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class PresentacionesListComponent implements OnInit {
  presentaciones: Presentacion[] = [];
  total: number = 0;
  page: number = 1;
  xpage: number = 10;

  constructor(private presentacionService: PresentacionService) {}

  ngOnInit(): void {
    this.loadPresentaciones();
  }

  loadPresentaciones(): void {
    this.presentacionService.List(this.page, this.xpage).subscribe({
      next: (data) => {
        this.presentaciones = data.list;
        this.total = data.total;
      },
      error: (err) => console.error('Error loading presentaciones', err)
    });
  }

  deletePresentacion(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta presentación?')) {
      this.presentacionService.eliminar(id).subscribe({
        next: () => this.loadPresentaciones(),
        error: (err) => console.error('Error deleting presentacion', err)
      });
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadPresentaciones();
    }
  }

  nextPage(): void {
    if (this.page * this.xpage < this.total) {
      this.page++;
      this.loadPresentaciones();
    }
  }
}