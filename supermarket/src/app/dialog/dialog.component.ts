import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  articulos = ["Articulo nuevo", "Articulo Usado", "Articulo Reacondicionado"]

  productForm!: FormGroup;
  constructor(private formBuilders: FormBuilder, private apiSvc: ApiService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilders.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      stade: ['', Validators.required],
      price: ['', Validators.required],
      comments: ['', Validators.required],
      date: ['', Validators.required]
    })
  }
  addProduct() {
    if (this.productForm.valid) {
      this.apiSvc.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert("producto agregado correctamente mi perro")
        },
        error: () => {
          alert("tu aplicacion esta del culo cambiala")
        }
      })
    }
  }
}


