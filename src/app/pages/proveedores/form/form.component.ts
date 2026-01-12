import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProveedorService } from '../../../services/proveedor.service';
import { Proveedor } from '../../../models/proveedor';
import { Persona } from '../../../models/persona';
import { TipoPersona } from '../../../models/tipopersona';
import { formatDate } from '@angular/common';
import { TipoPersonaService } from '../../../services/tipopersona.service';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-proveedor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class ProveedorFormComponent implements OnInit {
             
  proveedorForm!: FormGroup;
  isEditMode = false;
  proveedorId?: number;
  personaId?: number;
  fechaLimpia = '';
  tipopersonas: TipoPersona[] = [];

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private tipoPersonaService: TipoPersonaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.proveedorId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.proveedorId;
    
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      ruc: ['', [Validators.pattern('^[0-9]{11}$')]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: [''],
      sexo: [''],
      fechanacimiento: ['', [
        Validators.required, 
        Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)
      ]],
      tipopersona: [null]
    });

    const tipopersonas$ = this.tipoPersonaService.listar();
    const proveedor$ = this.isEditMode && this.proveedorId ? this.proveedorService.getById(this.proveedorId) : of(null);

    forkJoin({ tipopersonas: tipopersonas$, proveedor: proveedor$ }).subscribe(({ tipopersonas, proveedor }) => {
      this.tipopersonas = tipopersonas.list;
      
      if (this.isEditMode && proveedor) {
        const proveedorData: any = Object.values(proveedor.list);
    
        this.personaId = proveedorData[0].persona.idpersona;
        this.fechaLimpia = formatDate(proveedorData[0].persona.fechanacimiento, 'yyyy-MM-dd', 'en-US');
        
        this.proveedorForm.patchValue({
          nombre: proveedorData[0].persona.nombre,
          paterno: proveedorData[0].persona.paterno,
          materno: proveedorData[0].persona.materno,
          dni: proveedorData[0].persona.dni,
          ruc: proveedorData[0].persona.ruc,
          correo: proveedorData[0].persona.correo,
          telefono: proveedorData[0].persona.telefono,
          direccion: proveedorData[0].persona.direccion,
          sexo: proveedorData[0].persona.sexo,
          fechanacimiento: this.fechaLimpia,
          tipopersona: proveedorData[0].persona.tipoPersona
        });
      }
    });
  }

  onSubmit(): void {
    /*if (this.proveedorForm.invalid) {
      return;
    }*/
    const formValue = this.proveedorForm.value;
    
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

    const proveedor: Proveedor = {
      idproveedor: this.proveedorId || 0,
      persona: persona,
    };

    if (this.isEditMode && this.proveedorId) {
      this.proveedorService.guardar(proveedor).subscribe(() => {
        this.router.navigate(['../proveedores'], { relativeTo: this.route });
      });
    } else {
      this.proveedorService.guardar(proveedor).subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
  }

  compareWith(o1: TipoPersona, o2: TipoPersona): boolean {
    return o1 && o2 ? o1.idtipopersona === o2.idtipopersona : o1 === o2;
  }
}
