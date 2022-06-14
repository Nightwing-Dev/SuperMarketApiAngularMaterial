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

    console.log(this.editData);
  }
  addProduct() {
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
      })
    }
  }
}


