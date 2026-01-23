import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PresentacionService } from '../../../services/presentacion.service';
import { Presentacion } from '../../../models/presentacion';

@Component({
  selector: 'app-presentacion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class PresentacionFormComponent implements OnInit {
  presentacionForm: FormGroup;
  isEditMode: boolean = false;
  presentacionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private presentacionService: PresentacionService
  ) {
    this.presentacionForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.checkEditMode();
  }

  checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.presentacionId = +id;
      this.loadPresentacion(this.presentacionId);
    }
  }

  loadPresentacion(id: number): void {
    this.presentacionService.getById(id).subscribe({
      next: (data) => {
        const presentacion = data.list[0];
        if (presentacion) {
          this.presentacionForm.patchValue({
            nombre: presentacion.nombre
          });
        }
      },
      error: (err) => {
        console.error('Error loading presentacion', err);
        this.toastr.error('Error al cargar presentación');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/presentacion']);
  }

  onSubmit(): void {
    if (this.presentacionForm.valid) {
      const formValue = this.presentacionForm.value;

      const presentacion: Presentacion = {
        idpresentacion: this.presentacionId || 0,
        nombrepresentacion: formValue.nombre
      };

      if (this.isEditMode && this.presentacionId) {
        this.presentacionService.guardar(presentacion).subscribe({
          next: () => {
            this.toastr.success('Presentación actualizada exitosamente');
            this.router.navigate(['/presentacion']);
          },
          error: (err) => {
            console.error('Error updating presentacion', err);
            this.toastr.error('Error al actualizar presentación');
          }
        });
      } else {
        this.presentacionService.guardar(presentacion).subscribe({
          next: () => {
            this.toastr.success('Presentación creada exitosamente');
            this.router.navigate(['/presentacion']);
          },
          error: (err) => {
            console.error('Error creating presentacion', err);
            this.toastr.error('Error al crear presentación');
          }
        });
      }
    } else {
      this.toastr.warning('Por favor, complete todos los campos requeridos');
    }
  }
}