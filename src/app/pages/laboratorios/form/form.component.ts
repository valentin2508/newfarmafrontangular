import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LaboratorioService } from '../../../services/laboratorio.service';
import { Laboratorio } from '../../../models/laboratorio';

@Component({
  selector: 'app-laboratorio-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class LaboratorioFormComponent implements OnInit {
  laboratorioForm: FormGroup;
  isEditMode: boolean = false;
  laboratorioId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private laboratorioService: LaboratorioService
  ) {
    this.laboratorioForm = this.fb.group({
      nombrelaboratorio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.checkEditMode();
  }

  checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.laboratorioId = +id;
      this.loadLaboratorio(this.laboratorioId);
    }
  }

  loadLaboratorio(id: number): void {
    this.laboratorioService.getById(id).subscribe({
      next: (data) => {
        const laboratorio = data.list[0];
        if (laboratorio) {
          this.laboratorioForm.patchValue({
            nombrelaboratorio: laboratorio.nombrelaboratorio
          });
        }
      },
      error: (err) => {
        console.error('Error loading laboratorio', err);
        this.toastr.error('Error al cargar laboratorio');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/laboratorio']);
  }

  onSubmit(): void {
    if (this.laboratorioForm.valid) {
      const formValue = this.laboratorioForm.value;

      const laboratorio: Laboratorio = {
        idlaboratorio: this.laboratorioId || 0,
        nombrelaboratorio: formValue.nombrelaboratorio
      };

      if (this.isEditMode && this.laboratorioId) {
        this.laboratorioService.guardar(laboratorio).subscribe({
          next: () => {
            this.toastr.success('Laboratorio actualizado exitosamente');
            this.router.navigate(['/laboratorio']);
          },
          error: (err) => {
            console.error('Error updating laboratorio', err);
            this.toastr.error('Error al actualizar laboratorio');
          }
        });
      } else {
        this.laboratorioService.guardar(laboratorio).subscribe({
          next: () => {
            this.toastr.success('Laboratorio creado exitosamente');
            this.router.navigate(['/laboratorio']);
          },
          error: (err) => {
            console.error('Error creating laboratorio', err);
            this.toastr.error('Error al crear laboratorio');
          }
        });
      }
    } else {
      this.toastr.warning('Por favor, complete todos los campos requeridos');
    }
  }
}