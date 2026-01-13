import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasService } from '../../services/ventas.service';
import { Venta } from '../../models/venta.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  totalSales: number = 0;
  currentMonthSales: number = 0;
  growthPercentage: number = 0;
  totalClients: number = 0;
  totalProductsSold: number = 0;
  latestSales: Venta[] = [];
  salesByMonth: { [key: string]: number } = {};
  chart: any;

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.loadSalesData();
  }

  ngAfterViewInit(): void {
  }
  loadSalesData(): void {
    this.ventasService.List(1, 100).subscribe({
      next: (data) => {
        debugger;
        const ventas = data.list;
        //this.totalProductsSold=data.total;
        this.processSalesData(ventas);
        this.createChart();
      },
      error: (error) => {
        console.error('Error loading sales data:', error);
      }
    });
  }
  processSalesData(ventas: Venta[]): void {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let total = 0;
    let currentMonthTotal = 0;
    let lastMonthTotal = 0;
    const clients = new Set<number>();
    const monthlySales: { [key: string]: number } = {};

    ventas.forEach(venta => {

      const fecha = new Date(venta.fechaventa!);
      const monthKey = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
      const amount = venta.costoventa || 0;
       
      total += amount;
      if (fecha.getMonth() === currentMonth && fecha.getFullYear() === currentYear) {
        currentMonthTotal += amount;
      }
      if (fecha.getMonth() === lastMonth && fecha.getFullYear() === lastMonthYear) {
        lastMonthTotal += amount;
      }
      if (!monthlySales[monthKey]) {
        monthlySales[monthKey] = 0;
      }
      monthlySales[monthKey] += amount;

      if (venta.cliente?.idcliente) {
        clients.add(venta.cliente.idcliente);
      }
    });
    this.totalSales = total;
    this.currentMonthSales = currentMonthTotal;
    this.totalClients = clients.size;
    this.salesByMonth = monthlySales;

    // Calculate growth
    if (lastMonthTotal > 0) {
      this.growthPercentage = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    }

    // Latest sales (last 5)
    this.latestSales = ventas.slice(0, 5);

    // For total products sold, would need detalleventa, but for now set to 0
    this.totalProductsSold = 0;
  }

  createChart(): void {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!ctx) return;
    debugger;
    const labels = Object.keys(this.salesByMonth).sort();
    const data = labels.map(label => this.salesByMonth[label]);

    this.chart = new Chart(ctx, {
      data: {
        labels: labels,
        datasets: [{
          type: 'bar',
          label: 'Ventas por Mes',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }, {
          type: 'line',
          label: 'Tendencia',
          data: data,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
