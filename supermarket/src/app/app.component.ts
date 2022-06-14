import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'stade', 'price', 'comments', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;
  title = 'supermarket';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private apiSvc: ApiService) {

  }

  ngOnInit(): void {
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'guardar') {
        this.getAllProducts();
      }
    });
  }
  getAllProducts() {
    this.apiSvc.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("tu aplicacion falla de maneras increibles");
      }
    });
  }
  editProduct(element: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(val => {
      if (val === 'actualizar') {
        this.getAllProducts();
      }
    });
  }
  deleteProduct(id:number) {
    this.apiSvc.delete(id).subscribe({
      next:(res)=>{
        alert("tu producto fue eliminado, espero no te arrepientas o si ?");
        this.getAllProducts();
      },
      error:()=>{
        alert("error borrando tu producto");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh(): void { window.location.reload(); }
}
