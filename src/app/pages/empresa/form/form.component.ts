import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../../../services/empresa.service';
import { empresa } from '../../../models/empresa';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class EmpresaFormComponent implements OnInit {
  empresaForm: FormGroup;
  isEditMode: boolean = false;
  empresaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private empresaService: EmpresaService
  ) {
    this.empresaForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: [''],
      paginaweb: [''],
      telefono: [''],
      correo: [''],
      info1: [''],
      info2: [''],
      info3: ['']
    });
  }

  ngOnInit(): void {
    this.checkEditMode();
  }

  checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.empresaId = +id;
      this.loadEmpresa(this.empresaId);
    }
  }

  loadEmpresa(id: number): void {
    this.empresaService.getById(id).subscribe({
      next: (data) => {
        const empresa = data.list[0];
        if (empresa) {
          this.empresaForm.patchValue({
            nombre: empresa.nombre,
            direccion: empresa.direccion,
            paginaweb: empresa.paginaweb,
            telefono: empresa.telefono,
            correo: empresa.correo,
            info1: empresa.info1,
            info2: empresa.info2,
            info3: empresa.info3
          });
        }
      },
      error: (err) => {
        console.error('Error loading empresa', err);
        this.toastr.error('Error al cargar empresa');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/empresa']);
  }

  onSubmit(): void {
    if (this.empresaForm.valid) {
      const formValue = this.empresaForm.value;

      const empresa: empresa = {
        idempresa: this.empresaId || 0,
        nombre: formValue.nombre,
        direccion: formValue.direccion,
        paginaweb: formValue.paginaweb,
        telefono: formValue.telefono,
        correo: formValue.correo,
        info1: formValue.info1,
        info2: formValue.info2,
        info3: formValue.info3
      };

      if (this.isEditMode && this.empresaId) {
        this.empresaService.guardar(empresa).subscribe({
          next: () => {
            this.toastr.success('Empresa actualizada exitosamente');
            this.router.navigate(['/empresa']);
          },
          error: (err) => {
            console.error('Error updating empresa', err);
            this.toastr.error('Error al actualizar empresa');
          }
        });
      } else {
        this.empresaService.guardar(empresa).subscribe({
          next: () => {
            this.toastr.success('Empresa creada exitosamente');
            this.router.navigate(['/empresas']);
          },
          error: (err) => {
            console.error('Error creating empresa', err);
            this.toastr.error('Error al crear empresa');
          }
        });
      }
    } else {
      this.toastr.warning('Por favor, complete todos los campos requeridos');
    }
  }
}