import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { usuario, EmpleadoList } from '../../models/usuario';
import { CargoService } from '../../services/cargo.service';
import { cargo } from '../../models/cargo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: usuario[] = [];
  page: number = 1;
  xpage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  usuarioForm: FormGroup;
  isEditMode: boolean = false;
  currentUsuarioId: number | null = null;
  showModal: boolean = false;
  cargos: cargo[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private cargoService: CargoService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.usuarioForm = this.fb.group({
      nombreusuario: ['', Validators.required],
      clave: ['', Validators.required],
      cargo: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadCargos();
  }

  loadUsuarios(): void {
    this.usuarioService.listar(this.page, this.xpage).subscribe((data: EmpleadoList) => {
      this.usuarios = data.list;
      this.totalItems = data.total;
      this.totalPages = Math.ceil(this.totalItems / this.xpage);
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

  nextPage(): void {
    if ((this.page * this.xpage) < this.totalItems) {
      this.page++;
      this.loadUsuarios();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadUsuarios();
    }
  }

  editUsuario(id: number): void {
    this.isEditMode = true;
    this.currentUsuarioId = id;
    this.usuarioService.getById(id).subscribe({
      next: (data: any) => {
        const usr = data.list[0];
        if (usr) {
          this.usuarioForm.patchValue({
            nombreusuario: usr.nombreusuario,
            clave: '', // No mostrar clave
            cargo: usr.cargo?.idcargo
          });
        }
        this.showModal = true;
      },
      error: (err) => {
        console.error('Error loading usuario', err);
        this.toastr.error('Error al cargar usuario');
      }
    });
  }

  deleteUsuario(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.usuarioService.eliminar(id).subscribe({
        next: () => {
          this.toastr.success('Usuario eliminado exitosamente');
          this.loadUsuarios();
        },
        error: (err) => {
          console.error('Error deleting usuario', err);
          this.toastr.error('Error al eliminar usuario');
        }
      });
    }
  }

  addUsuario(): void {
    this.isEditMode = false;
    this.currentUsuarioId = null;
    this.usuarioForm.reset();
    this.showModal = true;
  }

  saveUsuario(): void {
    if (this.usuarioForm.valid) {
      const formValue = this.usuarioForm.value;
      const selectedCargo = this.cargos.find(c => c.idcargo === +formValue.cargo);

      const usr: usuario = {
        idusuario: this.currentUsuarioId || 0,
        nombreusuario: formValue.nombreusuario,
        clave: formValue.clave,
        fechacreacion: new Date(),
        cargo: selectedCargo
      };

      if (this.isEditMode && this.currentUsuarioId) {
        this.usuarioService.guardar(usr).subscribe({
          next: () => {
            this.toastr.success('Usuario actualizado exitosamente');
            this.showModal = false;
            this.loadUsuarios();
          },
          error: (err) => {
            console.error('Error updating usuario', err);
            this.toastr.error('Error al actualizar usuario');
          }
        });
      } else {
        this.usuarioService.guardar(usr).subscribe({
          next: () => {
            this.toastr.success('Usuario creado exitosamente');
            this.showModal = false;
            this.loadUsuarios();
          },
          error: (err) => {
            console.error('Error creating usuario', err);
            this.toastr.error('Error al crear usuario');
          }
        });
      }
    } else {
      this.toastr.warning('Por favor, complete todos los campos requeridos');
    }
  }

  closeModal(): void {
    this.showModal = false;
  }
}
