import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargoService } from '../../../services/cargo.service';
import { EstadoService } from '../../../services/estado.service';
import { cargo } from '../../../models/cargo';
import { Estado } from '../../../models/estado';

@Component({
  selector: 'app-cargo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class CargoFormComponent implements OnInit {
  cargoForm: FormGroup;
  isEditMode: boolean = false;
  cargoId: number | null = null;
  estados: Estado[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private cargoService: CargoService,
    private estadoService: EstadoService
  ) {
    this.cargoForm = this.fb.group({
      nombrecargo: ['', Validators.required],
      descripcion: [''],
      estado: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEstados();
    this.checkEditMode();
  }

  loadEstados(): void {
    this.estadoService.List().subscribe(result => {
      this.estados = result.list.filter(e => e.estado && (e.estado === 'ACTIVO' || e.estado === 'INACTIVO'));
      this.estados.sort((a, b) => {
        if (a.estado === 'ACTIVO') return -1;
        if (b.estado === 'ACTIVO') return 1;
        return 0;
      });
    });
  }

  checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.cargoId = +id;
      this.loadCargo(this.cargoId);
    }
  }

  loadCargo(id: number): void {
    debugger;
    this.cargoService.getById(id).subscribe({
      next: (data) => {
        debugger;
        const cargo = data.list[0];
        if (cargo) {
          this.cargoForm.patchValue({
            nombrecargo: cargo.nombrecargo,
            descripcion: cargo.descripcion,
            estado: cargo.estado?.idestado
          });
        }
      },
      error: (err) => {
        console.error('Error loading cargo', err);
        this.toastr.error('Error al cargar cargo');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/cargos']);
  }

  onSubmit(): void {
    if (this.cargoForm.valid) {
      const formValue = this.cargoForm.value;
      const selectedEstado = this.estados.find(e => e.idestado === +formValue.estado);

      const cargo: cargo = {
        idcargo: this.cargoId || 0,
        nombrecargo: formValue.nombrecargo,
        descripcion: formValue.descripcion,
        estado: selectedEstado ? { idestado: selectedEstado.idestado, estado: selectedEstado.estado } : undefined
      };

      if (this.isEditMode && this.cargoId) {
        this.cargoService.guardar(cargo).subscribe({
          next: () => {
            this.toastr.success('Cargo actualizado exitosamente');
            this.router.navigate(['/cargos']);
          },
          error: (err) => {
            console.error('Error updating cargo', err);
            this.toastr.error('Error al actualizar cargo');
          }
        });
      } else {
        this.cargoService.guardar(cargo).subscribe({
          next: () => {
            this.toastr.success('Cargo creado exitosamente');
            this.router.navigate(['/cargos']);
          },
          error: (err) => {
            console.error('Error creating cargo', err);
            this.toastr.error('Error al crear cargo');
          }
        });
      }
    } else {
      this.toastr.warning('Por favor, complete todos los campos requeridos');
    }
  }
}