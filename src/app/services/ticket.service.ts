import { Injectable } from '@angular/core';
import { Venta } from '../models/venta.model';
import { DetalleVenta } from '../models/detalleventa';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }

  public openPrintPreview(ticketHTML: string): void {
    const printWindow = window.open('', '_blank', 'width=302,height=500'); // Ancho aprox 80mm en pixeles
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Vista Previa de Ticket</title>
            <style>
              body {
                font-family: 'Courier New', Courier, monospace;
                font-size: 10px;
                width: 80mm;
                margin: 0;
                padding: 5px;
                background-color: #f0f0f0;
              }
              .ticket-container {
                background-color: #fff;
                border: 1px dashed #ccc;
                padding: 10px;
              }
              .header, .lema, .qr {
                text-align: center;
              }
              h2 {
                margin: 0;
                font-size: 14px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 10px 0;
              }
              th, td {
                border: none;
                padding: 2px;
                text-align: left;
              }
              td {
                border-bottom: 1px dashed #ccc; /* Separador para los items */
              }
              th {
                border-bottom: 1px solid #000;
              }
              .resumen p {
                margin: 2px 0;
                text-align: right;
              }
               .resumen .subtotalalign strong {
                 float: left;
               }
              .cliente {
                margin-bottom: 10px;
              }
              @media print {
                body {
                  background-color: #fff;
                }
                .ticket-container {
                  border: none;
                }
                /* Ocultar la barra de herramientas de impresión */
                @page {
                  size: 80mm auto; /* Ajusta el tamaño del papel */
                  margin: 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="ticket-container">
              ${ticketHTML}
            </div>
            <script>
              window.onload = function() {
                window.print();
                // window.close(); // Descomentar para cerrar la ventana después de imprimir
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }
  
  public createTicketHTML(venta: Partial<Venta>, detalles: any[], clienteNombre: string): string {
    return `
      <div class="header">
        <h2>Ticket de Venta</h2>
      </div>
      <div class="cliente">
        <strong>Cliente:</strong> ${clienteNombre}
      </div>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>P.U.</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          ${detalles.map(item => `
            <tr>
              <td>${item.producto?.nombre || item.nombre}</td>
              <td>${item.unidades || item.cantidadLlevar}</td>
              <td> ${Number(item.costounidad || item.precioventa).toFixed(2)}</td>
              <td> ${Number(item.total || item.subTotal).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="resumen">
        <p class="subtotalalign"><strong>Subtotal:</strong> S/ ${Number(venta.subtotal).toFixed(2)}</p>
        <p><strong>IGV (18%):</strong> S/ ${Number(venta.igv).toFixed(2)}</p>
        <p><strong>Total:</strong> S/ ${Number(venta.costoventa).toFixed(2)}</p>
      </div>
      <div class="lema">
        Cuidamos tu economía y el medio ambiente.
      </div>
    `;
  }
}
