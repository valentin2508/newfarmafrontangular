import { Component,inject,Input,OnInit, Pipe,LOCALE_ID } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import moment, { locale } from 'moment';
import { DatePipe, formatDate } from '@angular/common';
import { NgModule } from '@angular/core';
import { response, Router } from 'express';
import { Console, error, log } from 'console';
import { PresentacionService } from '../../../services/presentacion.service';
import { CommonModule } from '@angular/common';
import { UnidadmedidaService } from '../../../services/unidadmedida.service';
import { LaboratorioService } from '../../../services/laboratorio.service';
import { ActivatedRoute } from '@angular/router';

import { ProductosListComponent } from '../list/productosList.component';
import { DatosService } from '../../../services/datos.service';
import { producto } from '../../../models/producto';


import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatDatepickerModule,MatInputModule,MatFormFieldModule],
  templateUrl: './productForm.component.html',
  styleUrl: './productForm.component.css',
  providers:[{ provide: LOCALE_ID, useValue: "en-US" },ProductoService,PresentacionService,UnidadmedidaService,LaboratorioService,provideNativeDateAdapter()]
})
export class productFormComponent  implements OnInit 
  { 
    fechaActual = formatDate(new Date(),'yyyy-MM-dd', 'en-US')
    operacion: string="Crear";
    operacionBoton: string="Crear";
    randon:number=this.randomMath();
    IdProductoEdit: number;  
    prod: producto[] = [];
   // total:number=0;
    //xpage:number = 0;
   
    constructor(
      private  aRoute:ActivatedRoute,
      private http: HttpClient,
      private toastr:ToastrService
    ){
    this.IdProductoEdit=Number(aRoute.snapshot.paramMap.get('id'));
  }
  randomMath():number 
  {
     return Math.floor(Math.random() * 100000);
  }
  ngOnInit(): void {
    console.log(this.fechaActual);
    

    
    if(this.IdProductoEdit!=0){
      this.operacion='Editar';
      this.operacionBoton='Modificar';
      this.modificarProducto();
    }
    else{
      this.verPresentacion();
      this.verUnidadMedida();
      this.verLaboratorio();
    }
    
  }

   private fb=inject(FormBuilder);
   presentacion: any[] = [];
   unidadmedida: any[] = [];
   laboratorio: any[] = [];
  
   form=this.fb.group({
    idproducto:[0],
    codigoproducto:['NewFarma-'+Date.now(),Validators.required],
    nombre:['',Validators.required],
    vencimiento: [this.fechaActual,Validators.required],
    estado:['Activo',Validators.required],
    composicion:[''],
    ubicacion:['',Validators.required],
   
    presentacion: ({
      idpresentacion: (0),
      nombrepresentacion:('')
    }),
    unidadMedida:({
      idunidadmedida: (0),
      nombreunidad:('')
    }),
    laboratorio:({
      idlaboratorio:(0),
      nombrelaboratorio:('')
    }),
    stock:[0],
    precioventa:[0],
    precioblister:[0],
    preciocaja:[0],  
    codbarra:[''],  
    
  });
 
  private productService=inject(ProductoService);
  private presentacionService=inject(PresentacionService);
  private unidadmedidaService=inject(UnidadmedidaService);
  private laboratorioService=inject(LaboratorioService);
  
  
  //GUARDA un producto
  create()
  {
   
    let code:string='';
    let status:number=0
    let message:string='';
    const nuevoProducto= this.form.value;
    console.log(nuevoProducto);
    this.productService.createProducto(nuevoProducto)
    .subscribe(result=>{
      code=result.body.code;
      status=result.body.status;
      message=result.body.message;
      if(status==200 &&message=='SAVED SUCESSFULLY'){
       // alert('Producto creado satisfactoriamente.')
        this.toastr.success("Producto creado satisfactoriamente","Saved", 
          {
            timeOut: 10000,
            extendedTimeOut: 1000,
            tapToDismiss: false,
            closeButton:true
          })
      }else{
       //alert("statusSSSS:"+status+"\n message:"+message);
        this.toastr.success("Producto Actualizado satisfactoriamente","Update",
          {
            timeOut: 10000,
            extendedTimeOut: 1000,
            tapToDismiss: false,
            closeButton:true
          }
        )
      }
    },error=>console.log(error));
   
  }
   //Modificar producto
   modificarProducto() {
    // Cargar el producto por su ID
    this.productService.getProductById(this.IdProductoEdit).subscribe(response => {
      
      // Cargar las unidades de medida si aún no están disponibles
      if (!this.unidadmedida || this.unidadmedida.length === 0) {
        this.unidadmedidaService.list().subscribe(unidades => {
          this.unidadmedida = unidades.list;
  
          // Una vez que las unidades están cargadas, parchea el formulario
          this.parcharFormulario(response);
        });
        
        this.presentacionService.list().subscribe(presentaciones=>{
          this.presentacion=presentaciones.list;
          this.parcharFormulario(response);
        });

        this.laboratorioService.list().subscribe(laboratorio=>{
           this.laboratorio=laboratorio.list;
           this.parcharFormulario(response);
          });

      } else {
        // Si ya están cargadas, directamente parchea el formulario
        this.parcharFormulario(response);
      }
      
    });
    
  }
  
  parcharFormulario(response: any) {

    this.form.patchValue({
      idproducto:this.IdProductoEdit,
      nombre: response.list[0].nombre,
      ubicacion: response.list[0].ubicacion,
      vencimiento:moment(response.list[0].vencimiento, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      codigoproducto: response.list[0].codigoproducto,
      codbarra: response.list[0].codbarra,
      laboratorio:  this.laboratorio.find(um => um.nombrelaboratorio === response.list[0].laboratorio.nombrelaboratorio),
      unidadMedida: this.unidadmedida.find(um => um.nombreunidad === response.list[0].unidadMedida.nombreunidad),
      presentacion: this.presentacion.find(um => um.nombrepresentacion === response.list[0].presentacion.nombrepresentacion),
      composicion: response.list[0].composicion,
      precioventa:response.list[0].precioventa,
      precioblister:response.list[0].precioblister,
      preciocaja:response.list[0].preciocaja,
      stock:response.list[0].stock
    });
  }

  
 
  //trae toda la presentacion
  verPresentacion():void{
    this.presentacionService.list().subscribe(
      response=>{
        this.presentacion = response.list;
        
      }
      );
    }
    //trae toda la unidad de medida
  verUnidadMedida():void{
    this.unidadmedidaService.list().subscribe(
      response=>{
        this.unidadmedida = response.list;
       
      }
      );
    }
 //trae toda laboratorio
 verLaboratorio():void{
  this.laboratorioService.list().subscribe(
    response=>{
      this.laboratorio = response.list;
    }
    );
  }
}
