import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../../services/compras.service';
import { DetalleCompraService } from '../../../services/detallecompra.service';
import { Compra, CompraList } from '../../../models/compra';
import { DetalleCompra, DetalleCompraList } from '../../../models/detallecompra';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from '../../../shared/paginate/paginate.component';

@Component({
  selector: 'app-reports-compras',
  templateUrl: './reports-compras.component.html',
  styleUrls: ['./reports-compras.component.css'],
  standalone: true,
  imports: [CommonModule, PaginateComponent]
})
export class ReportsComprasComponent implements OnInit {

  compras: Compra[] = [];
  detallesCompra: { [key: number]: DetalleCompra[] } = {};
  selectedCompraId: number | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalCompras: number = 0;
  totalPages: number = 0;
  pages: any[] = [];
  nextCount: number = 1;
  agrupados: any={};

  constructor(
    private comprasService: ComprasService,
    private detalleCompraService: DetalleCompraService
  ) { }

  ngOnInit(): void {
    debugger;
    this.loadCompras();
  }

  loadCompras(): void {
    debugger;
    this.comprasService.List(this.currentPage, this.itemsPerPage).subscribe((response: CompraList) => {
      debugger;
      this.compras = response.list;
      this.agrupados = Object.values(response.list);
      this.totalCompras = response.total;
      this.totalPages = Math.ceil(this.totalCompras / this.itemsPerPage);
      this.pages = this.generatePageRange(1, this.totalPages > 30 ? 30 : this.totalPages);
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCompras();
  }

  generatePageRange(start: number, end: number) {
    let pages_ = [];
    for (let i = start; i <= end; i++) {
      pages_.push(i);
    }
    return pages_;
  }

  previoPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCompras();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCompras();
    }
  }

  toggleDetalles(compraId: number): void {
    if (this.selectedCompraId === compraId) {
      this.selectedCompraId = null;
    } else {
      this.selectedCompraId = compraId;
      if (!this.detallesCompra[compraId]) {
        this.detalleCompraService.getDetallesPorCompra(compraId).subscribe((response: DetalleCompraList) => {
          this.detallesCompra[compraId] = response.list;
        });
      }
    }
  }
}