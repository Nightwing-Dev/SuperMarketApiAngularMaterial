import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  articulos = ["Articulo nuevo", "Articulo Usado", "Articulo Reacondicionado"]

  productForm!: FormGroup;
  actionBtn: string = "Guardar";
  constructor(private formBuilders: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private apiSvc: ApiService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilders.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      stade: ['', Validators.required],
      price: ['', Validators.required],
      comments: ['', Validators.required],
      date: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "actualizar";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['stade'].setValue(this.editData.stade);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comments'].setValue(this.editData.comments);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }
  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.apiSvc.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert("producto agregado correctamente mi perro");
            this.productForm.reset();
            this.dialogRef.close('guardar');
          },
          error: () => {
            alert("error aplicacion fallando destruccion inminente")
          }
        });
      }
    } else {
      this.updateProduct();
    }
  }
  updateProduct() {
    this.apiSvc.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert("producto actualizado de manera correcta");
        this.productForm.reset();
        this.dialogRef.close('actualizar');
      },
      error:()=>{
        alert("tu aplicacion esta apunto de destruirse");
      }
    });
  }
}


