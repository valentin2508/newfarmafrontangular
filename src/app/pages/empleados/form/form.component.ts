import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from '../../../services/empleado.service';
import { EstadoService } from '../../../services/estado.service';
import { CargoService } from '../../../services/cargo.service';
import { Empleado } from '../../../models/empleado';
import { Persona } from '../../../models/persona';
import { Estado } from '../../../models/estado';
import { usuario } from '../../../models/usuario';
import { cargo } from '../../../models/cargo';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.css',
})
export class FormComponent implements OnInit {
  empleadoForm: FormGroup;
  isEditMode: boolean = false;
  empleadoId: number | null = null;
  idpersona: number | null = null;
  idusuario: number | null = null;
  fechacreacion: Date | null = null;
  idTipoPersona: number | null = null;
  nombreTipoPersona: string | null = null;
  estados: Estado[] = [];
  cargos: cargo[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private empleadoService: EmpleadoService,
    private estadoService: EstadoService,
    private cargoService: CargoService
  ) {
    this.empleadoForm = this.fb.group({
      // Persona fields
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      ruc: ['', null],
      nombre: ['', Validators.required],
      materno: ['', Validators.required],
      paterno: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      sexo: ['', Validators.required],
      direccion: ['', Validators.required],
      nombreusuario: ['', Validators.required],
      clave: ['', Validators.required],
      cargo: [null, Validators.required],
      estado: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEstados();
    this.loadCargos();
    this.checkEditMode();
  }

  loadEstados(): void {
    this.estadoService.List().subscribe(resul=>{
      this.estados=resul.list.filter(e=> e.estado && (e.estado==='ACTIVO' || e.estado==='INACTIVO'));
      this.estados.sort((a, b) => {
        if (a.estado === 'ACTIVO') return -1;
        if (b.estado === 'ACTIVO') return 1;
        return 0;
      });
    });
   
  }

  loadCargos(): void {
    this.cargoService.List().subscribe({
      next: (data) => {
        this.cargos = data.list;
      },
      error: (err) => {
        console.error('Error loading cargos', err);
        this.toastr.error('Error al cargar cargos');
      }
    });
  }

  checkEditMode(): void {
    debugger;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.empleadoId = +id;
      this.loadEmpleado(this.empleadoId);
    }
  }

  loadEmpleado(id: number): void {
    this.empleadoService.getById(id).subscribe({
      next: (data) => {
        debugger;
        const empleado = data.list[0];
        if (empleado) {
           this.idpersona= empleado.persona?.idpersona,
            this.idusuario= empleado.usuario?.idusuario,
            this.fechacreacion= empleado.usuario?.fechacreacion,
            this.idTipoPersona= empleado.persona?.tipoPersona?.idtipopersona,
            this.nombreTipoPersona= empleado.persona?.tipoPersona?.nombre;
            //this.idestado= empleado.estado?.idestado,
          this.empleadoForm.patchValue({
           
            dni: empleado.persona?.dni,
            ruc: empleado.persona?.ruc,
            nombre: empleado.persona?.nombre,
            materno: empleado.persona?.materno,
            paterno: empleado.persona?.paterno,
            fechanacimiento: formatDate(empleado.persona?.fechanacimiento, 'yyyy-MM-dd', 'en'),
            //formatDate(persona.fechanacimiento, 'yyyy-MM-dd', 'en');
            telefono: empleado.persona?.telefono,
            correo: empleado.persona?.correo,
            sexo: empleado.persona?.sexo,
            direccion: empleado.persona?.direccion,
            nombreusuario: empleado.usuario?.nombreusuario,
            cargo: empleado.usuario?.cargo?.idcargo,
            estado: empleado.estado?.idestado
          });
        }
      },
      error: (err) => {
        console.error('Error loading empleado', err);
        this.toastr.error('Error al cargar empleado');
      }
    });
  }
  cancel(): void {
    this.router.navigate(['/empleados']);
  }
  onSubmit(): void {
    if (this.empleadoForm.valid) {
      const formValue = this.empleadoForm.value;

      const selectedEstado = this.estados.find(e => e.idestado === +formValue.estado);
      const selectedCargo = this.cargos.find(c => c.idcargo === +formValue.cargo);

      const persona: Persona = {
        idpersona: this.idpersona ||0, // Will be set if editing
        dni: +formValue.dni,
        ruc: +formValue.ruc || 0,
        nombre: formValue.nombre,
        materno: formValue.materno,
        paterno: formValue.paterno,
        fechanacimiento: formValue.fechanacimiento,
        telefono: formValue.telefono,
        correo: formValue.correo,
        sexo: formValue.sexo,
        direccion: formValue.direccion,
        tipoPersona: { idtipopersona: this.idTipoPersona?1:2, nombre: this.nombreTipoPersona?'NATURAL':'JURIDICA' } // Assuming 2 for employee
      };
      const usuarioObj: usuario = 
      {
          idusuario: this.idusuario || 0,
          nombreusuario: formValue.nombreusuario,
          clave: formValue.clave,
          fechacreacion: this.fechacreacion || new Date(),
          cargo: selectedCargo ? {
            idcargo: selectedCargo.idcargo,
            nombrecargo: selectedCargo.nombrecargo,
            descripcion: selectedCargo.descripcion,
            estado: selectedCargo.estado ? {
              idestado: selectedCargo.estado.idestado,
              estado: selectedCargo.estado.estado
            } : undefined
          } : undefined
      };
      const empleado: Empleado = {
        idempleado: this.empleadoId || 0,
        persona: persona,
        usuario: usuarioObj,
        estado: selectedEstado ? { idestado: selectedEstado.idestado, estado: selectedEstado.estado } : undefined
      };
debugger;
      if (this.isEditMode && this.empleadoId) {
        this.empleadoService.guardar(empleado).subscribe({
          next: () => {
            this.toastr.success('Empleado actualizado exitosamente');
            this.router.navigate(['/empleados']);
          },
          error: (err) => {
            console.error('Error updating empleado', err);
            this.toastr.error('Error al actualizar empleado');
          }
        });
      } else {
        this.empleadoService.guardar(empleado).subscribe({
          next: () => {
            this.toastr.success('Empleado creado exitosamente');
            this.router.navigate(['/empleados']);
          },
          error: (err) => {
            console.error('Error creating empleado', err);
            this.toastr.error('Error al crear empleado');
          }
        });
      }
    } else {
      this.toastr.warning('Por favor, complete todos los campos requeridos');
    }
  }
}
