import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

 articulos = ["Articulo nuevo", "Articulo Usado", "Articulo Reacondicionado"]
 
  //productForm!: FormGroup;
  //constructor(private formBuilders: FormBuilder) { }

  ngOnInit(): void {
    /*this.productForm = this.formBuilders.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      estado :['',Validators.required],
      precio:['', Validators.required],
      comentarios:['', Validators.required],
      date: ['',Validators.required]
    })
  }

}*/
  }}
