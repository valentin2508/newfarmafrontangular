import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnidadmedidaService } from '../../../services/unidadmedida.service';
import { UnidadMedida } from '../../../models/unidadmedida';

@Component({
  selector: 'app-unidadmedida-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class UnidadmedidaFormComponent implements OnInit {
  unidadmedidaForm: FormGroup;
  isEditMode: boolean = false;
  unidadmedidaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private unidadmedidaService: UnidadmedidaService
  ) {
    this.unidadmedidaForm = this.fb.group({
      nombreunidad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.checkEditMode();
  }

  checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.unidadmedidaId = +id;
      this.loadUnidadMedida(this.unidadmedidaId);
    }
  }

  loadUnidadMedida(id: number): void {
    this.unidadmedidaService.getById(id).subscribe({
      next: (data) => {
        const unidadmedida = data.list[0];
        if (unidadmedida) {
          this.unidadmedidaForm.patchValue({
            nombreunidad: unidadmedida.nombreunidad
          });
        }
      },
      error: (err) => {
        console.error('Error loading unidadmedida', err);
        this.toastr.error('Error al cargar unidad de medida');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/unidadmedida']);
  }

  onSubmit(): void {
    debugger;
    if (this.unidadmedidaForm.valid) {
      const formValue = this.unidadmedidaForm.value;

      const unidadmedida: UnidadMedida = {
        idunidadmedida: this.unidadmedidaId || 0,
        nombreunidad: formValue.nombreunidad
      };

      if (this.isEditMode && this.unidadmedidaId) {
        debugger;
        this.unidadmedidaService.guardar(unidadmedida).subscribe({
          next: () => {
            this.toastr.success('Unidad de medida actualizada exitosamente');
            this.router.navigate(['/unidadmedida']);
          },
          error: (err) => {
            console.error('Error updating unidadmedida', err);
            this.toastr.error('Error al actualizar unidad de medida');
          }
        });
      } else {
        this.unidadmedidaService.guardar(unidadmedida).subscribe({
          next: () => {
            this.toastr.success('Unidad de medida creada exitosamente');
            this.router.navigate(['/unidadmedida']);
          },
          error: (err) => {
            console.error('Error creating unidadmedida', err);
            this.toastr.error('Error al crear unidad de medida');
          }
        });
      }
    } else {
      this.toastr.warning('Por favor, complete todos los campos requeridos');
    }
  }
}