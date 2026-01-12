import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../services/ventas.service';
import { DetalleVentaService } from '../../../services/detalleventa.service';
import { Venta, ventaList } from '../../../models/venta.model';
import { DetalleVenta, DetalleVentaList } from '../../../models/detalleventa';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../services/ticket.service';
import { PaginateComponent } from '../../../shared/paginate/paginate.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  standalone: true,
  imports: [CommonModule, PaginateComponent]
})
export class ReportsComponent implements OnInit {

  ventas: Venta[] = [];
  detallesVenta: { [key: number]: DetalleVenta[] } = {};
  selectedVentaId: number | null = null;
  
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalVentas: number = 0;
  totalPages: number = 0;
  pages: any[] = [];
  nextCount: number = 1;
agrupados: any={};
  constructor(
    private ventasService: VentasService,
    private detalleVentaService: DetalleVentaService,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.loadVentas();
  }

  loadVentas(): void {
    this.ventasService.List(this.currentPage, this.itemsPerPage).subscribe((response: ventaList) => {
      this.ventas = response.list;
      this.agrupados = Object.values(response.list);
      this.totalVentas = response.total;
      this.totalPages = Math.ceil(this.totalVentas / this.itemsPerPage);
      this.pages = this.generatePageRange(1, this.totalPages > 30 ? 30 : this.totalPages);
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadVentas();
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
      this.loadVentas();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadVentas();
    }
  }

  toggleDetalles(ventaId: number): void {
    if (this.selectedVentaId === ventaId) {
      this.selectedVentaId = null;
    } else {
      this.selectedVentaId = ventaId;
      if (!this.detallesVenta[ventaId]) {
        this.detalleVentaService.getDetallesPorVenta(ventaId).subscribe((response: DetalleVentaList) => {
          this.detallesVenta[ventaId] = response.list;
        });
      }
    }
  }

  reimprimirTicket(venta: Venta): void {
    const ventaId = venta.idventa!;
    if (!this.detallesVenta[ventaId]) {
      this.detalleVentaService.getDetallesPorVenta(ventaId).subscribe((response: DetalleVentaList) => {
        this.detallesVenta[ventaId] = response.list;
        this.imprimir(venta, response.list);
      });
    } else {
      this.imprimir(venta, this.detallesVenta[ventaId]);
    }
  }

  private imprimir(venta: any, detalles: DetalleVenta[]): void {
    const clienteNombre = `${venta.cliente.persona.nombre} ${venta.cliente.persona.paterno} ${venta.cliente.persona.materno}`;
    const ticketHTML = this.ticketService.createTicketHTML(venta, detalles, clienteNombre);
    this.ticketService.openPrintPreview(ticketHTML);
  }
}
