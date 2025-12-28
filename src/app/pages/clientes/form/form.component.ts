import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { Persona } from '../../../models/persona';
import { TipoPersona } from '../../../models/tipopersona';
import { formatDate } from '@angular/common';
import { TipoPersonaService } from '../../../services/tipopersona.service';
import { forkJoin, of } from 'rxjs';
import { log } from 'node:console';

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
  personaId?: number;
  fechaLimpia = '';
  tipopersonas: TipoPersona[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private tipoPersonaService: TipoPersonaService,
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
      direccion: [''],
      sexo: [''],
      fechanacimiento: ['', [
        Validators.required, 
        Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)
      ]],
      tipopersona: [null, Validators.required]
    });

    const tipopersonas$ = this.tipoPersonaService.listar();
    const cliente$ = this.isEditMode && this.clienteId ? this.clienteService.getById(this.clienteId) : of(null);

    forkJoin({ tipopersonas: tipopersonas$, cliente: cliente$ }).subscribe(({ tipopersonas, cliente }) => {
      this.tipopersonas = tipopersonas.list;
      
      if (this.isEditMode && cliente) {
        const clienteData: any = Object.values(cliente.list);
    
        this.personaId = clienteData[0].persona.idpersona;
        this.fechaLimpia = formatDate(clienteData[0].persona.fechanacimiento, 'yyyy-MM-dd', 'en-US');
        
        this.clienteForm.patchValue({
          nombre: clienteData[0].persona.nombre,
          paterno: clienteData[0].persona.paterno,
          materno: clienteData[0].persona.materno,
          dni: clienteData[0].persona.dni,
          ruc: clienteData[0].persona.ruc,
          correo: clienteData[0].persona.correo,
          telefono: clienteData[0].persona.telefono,
          direccion: clienteData[0].persona.direccion,
          sexo: clienteData[0].persona.sexo,
          fechanacimiento: this.fechaLimpia,
          tipopersona: clienteData[0].persona.tipoPersona
        });
      }
    });
  }

  onSubmit(): void {
    debugger;
    /*if (this.clienteForm.invalid) {
      return;
    }*/
    debugger;
    const formValue = this.clienteForm.value;
    
    const persona: Persona = {
      idpersona: Number(this.personaId) || 0,
      nombre: formValue.nombre,
      paterno: formValue.paterno,
      materno: formValue.materno,
      dni: formValue.dni,
      ruc: formValue.ruc,
      correo: formValue.correo,
      telefono: formValue.telefono,
      direccion: formValue.direccion,
      fechanacimiento: formValue.fechanacimiento,
      sexo: formValue.sexo,
      tipoPersona: formValue.tipopersona
    };

    const cliente: Cliente = {
      idcliente: this.clienteId || 0,
      persona: persona,
    };

    if (this.isEditMode && this.clienteId) {
      this.clienteService.guardar( cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    } else {
      this.clienteService.guardar(cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }

  compareWith(o1: TipoPersona, o2: TipoPersona): boolean {
    return o1 && o2 ? o1.idtipopersona === o2.idtipopersona : o1 === o2;
  }
}

