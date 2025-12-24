import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { Persona } from '../../../models/persona';
import { TipoPersona } from '../../../models/tipopersona';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class ClienteFormComponent implements OnInit {
             
  clienteForm!: FormGroup;
  isEditMode = false;
  clienteId?: number;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clienteId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.clienteId;

    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      ruc: ['', [Validators.pattern('^[0-9]{11}$')]],
      correo: ['', [Validators.required, Validators.email]], // Changed from email to correo
      telefono: [''],
      direccion: ['']
    });

    if (this.isEditMode && this.clienteId) {
      this.clienteService.getById(this.clienteId).subscribe((cliente: Cliente) => { // Changed getClienteById to getById and added type
        this.clienteForm.patchValue({
          nombre: cliente.idpersona?.nombre, // Corrected property access
          paterno: cliente.idpersona?.paterno, // Added paterno
          materno: cliente.idpersona?.materno, // Added materno
          dni: cliente.idpersona?.dni,
          ruc: cliente.idpersona?.ruc,
          correo: cliente.idpersona?.correo, // Changed from email to correo
          telefono: cliente.idpersona?.telefono,
          direccion: cliente.idpersona?.direccion
        });
      });
    }
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) {
      return;
    }

    const formValue = this.clienteForm.value;

    const tipoPersona: TipoPersona = { // Renamed from tipoCliente
      idtipopersona: 1, // Asumiendo que 1 es para clientes
      nombre: 'CLIENTE' // Corrected property name and value
    };

    const persona: Persona = {
      idpersona: 0, // se asignará en el backend
      nombre: formValue.nombre,
      paterno: formValue.paterno, // Added paterno
      materno: formValue.materno, // Added materno
      dni: formValue.dni,
      ruc: formValue.ruc, // Ruc is part of Persona in the model
      correo: formValue.correo, // Changed from email to correo
      telefono: formValue.telefono,
      direccion: formValue.direccion,
      fechanacimiento: '', // Assuming an empty string or default value if not captured by form
      sexo: '', // Assuming an empty string or default value if not captured by form
      tipoPersona: tipoPersona
    };

    const cliente: Cliente = {
      idcliente: this.clienteId || 0, // Corrected property name
      idpersona: persona, // Corrected property name
    };

    if (this.isEditMode && this.clienteId) {
      this.clienteService.updateCliente(this.clienteId, cliente).subscribe(() => {
        this.router.navigate(['/dashboard/clientes']);
      });
    } else {
      this.clienteService.guardar(cliente).subscribe(() => { // Changed createCliente to guardar
        this.router.navigate(['/dashboard/clientes']);
      });
    }
  }
}
