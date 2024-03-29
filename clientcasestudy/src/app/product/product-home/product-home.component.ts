import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';
import { ProductService } from '@app/product/product.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  templateUrl: 'product-home.component.html',
})
export class ProductHomeComponent implements OnInit, AfterViewInit {
  // Observables
  vendors$?: Observable<Vendor[]>; // for vendors drop down

  products$?: Observable<Product[]>;

  productDataSource$?: Observable<MatTableDataSource<Product>>; // for MatTable
  // misc.
  product: Product;
  hideEditForm: boolean;
  msg: string;
  // for pagination
  size: number = 0;
  // MatPaginator
  length = 0;
  pageSize = 8;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  // sort stuff
  displayedColumns: string[] = ['id', 'dateincurred', 'vendorid'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private vendorService: VendorService,

    private productService: ProductService
  ) {
    this.hideEditForm = true;
    this.product = {
      id: 0,
      vendorid: 0,
      name: '',
      costprice: 0.0,
      msrp: 0.0,
      rop: 0,
      eoq: 0,
      qoh: 0,
      qoo: 0,
      qrcode: '',
      qrcodetxt: '',
      // receipt: false,
      // receiptscan: '',
    };
    this.msg = '';
    this.sort = new MatSort();
  } // constructor
  ngOnInit(): void {
    (this.products$ = this.productService.get()),
      catchError((err) => (this.msg = err.message));
    (this.productDataSource$ = this.productService.get().pipe(
      map((products) => {
        const dataSource = new MatTableDataSource<Product>(products);
        this.dataSource.data = products;
        this.dataSource.sort = this.sort;
        // for pagination
        if (this.paginator !== undefined) {
          this.dataSource.paginator = this.paginator;
          }
        return dataSource;
      })
    )),
      catchError((err) => (this.msg = err.message));
  } // ngOnInit
  ngAfterViewInit(): void {
    // loading vendors later here
    // because timing issue with cypress testing in OnInit
    (this.vendors$ = this.vendorService.get()),
      catchError((err) => (this.msg = err.message));

    (this.products$ = this.productService.get()),
      catchError((err) => (this.msg = err.message));
  } // ngAfterInit
  select(selectedProduct: Product): void {
    this.product = selectedProduct;
    this.msg = `Product ${selectedProduct.id} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  /**
   * cancelled - event handler for cancel button
   */
  cancel(msg?: string): void {
    this.hideEditForm = !this.hideEditForm;
    this.msg = 'operation cancelled';
  } // cancel
  /**
   * update - send changed update to service update local array
   */
  update(selectedProduct: Product): void {
    this.productService.update(selectedProduct).subscribe({
      // observer object
      next: (exp: Product) => (this.msg = `Product ${exp.id} updated!`),
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => {
        this.hideEditForm = !this.hideEditForm;
      },
    });
  } // update

  /**
   * save - determine whether we're doing and add or an update
   */
  save(product: Product): void {
    this.dataSource.filteredData.indexOf(product) !== -1
      ? this.update(product)
      : this.add(product);
  } // save
  /**
   * add - send expense to service, receive newid back
   */
  add(newProduct: Product): void {
    this.msg = 'Adding product...';
    this.productService.add(newProduct).subscribe({
      // observer object
      next: (exp: Product) => {
        this.msg = `Product ${exp.id} added!`;
      },
      error: (err: Error) => (this.msg = `Expense not added! - ${err.message}`),
      complete: () => {
        this.hideEditForm = !this.hideEditForm;
      },
    });
  } // add
  /**
   * delete - send expense id to service for deletion
   */
  delete(selectedProduct: Product): void {
    this.productService.delete(selectedProduct.id).subscribe({
      // observer object
      next: (numOfProductDeleted: number) => {
        numOfProductDeleted === 1
          ? (this.msg = `Product ${selectedProduct.id} deleted!`)
          : (this.msg = `Product ${selectedProduct.id} not deleted!`);
      },
      error: (err: Error) => (this.msg = `Delete failed! - ${err.message}`),
      complete: () => {
        this.hideEditForm = !this.hideEditForm;
      },
    });
  } // delete
  /**
   * newExpense - create new expense instance
   */
  newProduct(): void {
    this.product = {
      id: 0,
      vendorid: 0,
      name: '',
      costprice: 0.0,
      msrp: 0.0,
      rop: 0,
      eoq: 0,
      qoh: 0,
      qoo: 0,
      qrcode: '',
      qrcodetxt: '',
      // receipt: false,
      // receiptscan: '',
    };
    this.msg = 'New product';
    this.hideEditForm = !this.hideEditForm;
  } // newExpense
  sortProductWithObjectLiterals(sort: Sort): void {
    const literals = {
      // sort on id
      id: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Product, b: Product) =>
            sort.direction === 'asc' ? a.id - b.id : b.id - a.id // descending
        )),
      // sort on Productid
      productid: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Product, b: Product) =>
            sort.direction === 'asc'
              ? a.vendorid - b.vendorid
              : b.vendorid - a.vendorid // descending
        )),
      // sort on dateincurred
    };
    literals[sort.active as keyof typeof literals]();
  } // sortExpensesWithObjectLiterals
} // ExpenseHomeComponent
