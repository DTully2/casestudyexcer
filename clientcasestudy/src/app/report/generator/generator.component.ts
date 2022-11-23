import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Vendor } from '@app/vendor/vendor';
import { Product } from '@app/product/product';
import { ReportItem } from '@app/report/report-item';
import { Report } from '@app/report/report';
import { VendorService } from '@app/vendor/vendor.service';
import { ProductService } from '@app/product/product.service';
import { ReportService } from '@app/report/report.service';
import { PDFURL } from '@app/constants';

@Component({
  templateUrl: './generator.component.html',
})
export class GeneratorComponent implements OnInit, OnDestroy {
  // form
  generatorForm: FormGroup;
  vendorid: FormControl;
  productid: FormControl;
  eoq: FormControl;
  // showTable: boolean = false;
  // data
  formSubscription?: Subscription;
  products$?: Observable<Product[]>; // everybody's expenses
  vendors$?: Observable<Vendor[]>; // all employees
  vendorproducts$?: Observable<Product[]>; // all expenses for a particular employee
  items: Array<ReportItem>; // expense items that will be in report
  selectedproducts: Product[]; // expenses that being displayed currently in app
  selectedProduct: Product; // the current selected expense
  selectedVendor: Vendor; // the current selected employee
  // misc
  pickedProduct: boolean;
  pickedVendor: boolean;
  pickedQty: boolean ;
  generated: boolean;
  hasProducts: boolean;
  msg: string;
  sub: number;
  total: number;
  tax: number;
  reportno: number = 0;

  constructor(
    private builder: FormBuilder,
    private vendorService: VendorService,
    private productService: ProductService,
    private reportService: ReportService
  ) {
    this.pickedVendor = false;
    this.pickedProduct = false;
    this.pickedQty = false;
    this.generated = false;
    this.msg = '';
    this.vendorid = new FormControl('');
    this.productid = new FormControl('');
    this.eoq = new FormControl('');
    this.generatorForm = this.builder.group({
      productid: this.productid,
      vendorid: this.vendorid,
      eoq: this.eoq,
    });
    this.selectedProduct = {
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
      products: [],
      // receipt: false,
      // receiptscan: '',
      
    };
    this.selectedVendor = {
      id: 0,
      address1: '',
      city: '',
      province: '',
      postalcode: '',
      phone: '',
      type: '',
      name: '',
      email: '',
    };
    this.items = new Array<ReportItem>();
    this.selectedproducts = new Array<Product>();
    this.hasProducts = false;
    this.total = 0.0;
    this.tax = 0.0;
    this.sub = 0.0;
  } // constructor
  ngOnInit(): void {
    this.onPickVendor();
    this.onPickProduct();
    this.onPickQty();
    this.msg = 'loading employees and expenses from server...';
    (this.vendors$ = this.vendorService.get()),
      catchError((err) => (this.msg = err.message));
    (this.products$ = this.productService.get()),
      catchError((err) => (this.msg = err.message));
    this.msg = 'server data loaded';
  } // ngOnInit
  ngOnDestroy(): void {
    if (this.formSubscription !== undefined) {
      this.formSubscription.unsubscribe();
    }
  } // ngOnDestroy
  /**
   * onPickEmployee - Another way to use Observables, subscribe to the select change event
   * then load specific employee expenses for subsequent selection
   */
  onPickVendor(): void {
    this.formSubscription = this.generatorForm
      .get('vendorid')
      ?.valueChanges.subscribe((val) => {
        this.selectedProduct = {
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
          products: [],
          // receipt: false,
          // receiptscan: '',
        };
        this.selectedVendor = val;
        this.loadVendorProducts();
        this.pickedProduct = false;
        this.hasProducts = false;
        this.msg = 'choose product for vendor';
        this.pickedVendor = true;
        this.generated = false;
        this.items = []; // array for the report
        this.selectedproducts = []; // array for the details in app html
      });
  } // onPickEmployee
  /**
   * onPickExpense - subscribe to the select change event then
   * update array containing items.
   */
   // onPickProduct
  onPickProduct(): void {
    const productSubscription = this.generatorForm
      .get('productid')
      ?.valueChanges.subscribe((val) => {
        this.eoq = val.eoq;
        this.pickedProduct = true;
        // this.hasProducts = true;
        this.pickedQty = true;
        this.selectedProduct = val;
        this.msg = 'Pick Quantity';
      });
    this.formSubscription?.add(productSubscription); // add it as a child, so all can bedestroyed together
  } 
  // onPickProduct(): void {
  //   const productSubscription = this.generatorForm
  //     .get('productid')
  //     ?.valueChanges.subscribe((val) => {
  //       this.selectedProduct = val;
  //       const item: ReportItem = {
  //         id: 0,
  //         reportid: 0,
  //         productid: this.selectedProduct?.id,
  //         qty: 0,
  //         price: this.selectedProduct?.costprice,
  //       };
  //       if (
  //         this.items.find((item) => item.productid === this.selectedProduct?.id)
  //       ) {
  //         // ignore entry
  //       } else {
  //         // add entry
  //         this.items.push(item);
  //         this.selectedproducts.push(this.selectedProduct);
  //       }
  //       if (this.items.length > 0) {
  //         this.hasProducts = true;
  //         this.pickedQty = true;
  //       }
  //       this.total = 0.0;
  //       this.tax = 0.0;

  //       this.selectedproducts.forEach(
  //         (exp) => (
  //           (this.sub += exp.costprice * exp.qoh),
  //           (this.tax += exp.qoh * exp.costprice * 0.13),
  //           (this.total += exp.qoh * exp.costprice * 1.13)
  //         )
  //       );
  //     });
  //   this.formSubscription?.add(productSubscription); // add it as a child, so all can be destroyed together
  // } // onPickExpense

  onPickQty(): void {
    //adjust qoh number for that certian product to reflect the new quantity from the form
    const qtySubscription = this.generatorForm
      .get('eoq')
      ?.valueChanges.subscribe((val) => {
        // console.log('quantity changed to ' + val);
        if (val == 0 && this.selectedProduct.eoq !== null) {
          this.msg =
            this.selectedProduct.name + ' was removed from Report order';
          this.items = this.items.filter(
            (item) => item.productid !== this.selectedProduct?.id
          );
          this.selectedproducts = this.selectedproducts.filter(
            (item) => item.id !== this.selectedProduct?.id
          );
          //get item
          if (this.selectedproducts.length == 0) {
            // this.showTable = false;
          }
          this.total = 0.0;
          this.tax = 0.0;
          this.sub = 0.0;
          // console.log('selectedproducts', this.selectedproducts);
          this.selectedproducts.forEach(
            (exp) => (
              (this.sub += exp.costprice * exp.qoh),
              (this.tax += exp.qoh * exp.costprice * 0.13),
              (this.total += exp.qoh * exp.costprice * 1.13)
            )
          );
        } else {
          this.eoq = val;

          this.selectedProduct.eoq = val;
          this.selectedProduct.qoh = val;

          this.selectedProduct.msrp = this.selectedProduct.costprice * val;
          // console.log(this.selectedProduct.msrp);
          // console.log(this.selectedProduct.costprice, val);
      
          const found = this.selectedproducts.find(
            (item) => item.id == this.selectedProduct.id
          ) as any;
          if (found == undefined) {
            this.selectedproducts.push(this.selectedProduct);            
            let purchaseOrderItem = {
              reportid: 0,
              id: 0,
              productid: this.selectedProduct.id,
              qty: this.selectedProduct.eoq,
              price: this.selectedProduct.msrp,
            } as ReportItem;
            this.items.push(purchaseOrderItem);
          }
          this.total = 0.0;
          this.tax = 0.0;
          this.sub = 0.0;
          this.selectedproducts.forEach((product) => {
            // console.log('product', product);

            this.total += product.msrp * 1.13;
            this.sub += product.msrp;
            this.tax += product.msrp * 0.13;
          });
          // this.showTable = true;
        }
      });
    this.formSubscription?.add(qtySubscription);

    if(this.items.length > 0)
    {this.hasProducts = true;}
  } // onPickQty

  /**
   * loadEmployeeExpenses - filter for a particular employee's products
   */
  loadVendorProducts(): void {
    this.vendorproducts$ = this.products$?.pipe(
      map((products) =>
        // map each expense in the array and check whether or not it belongs to selected employee
        products.filter(
          (product) => product.vendorid === this.selectedVendor?.id
        )
      )
    );
  } // loadEmployeeExpenses
  /**
   * createReport - create the client side report
   */
  createReport(): void {
    this.generated = false;
    const report: Report = {
      id: 0,
      items: this.items,
      vendorid: this.selectedProduct.vendorid,
      amount: this.total,
      datecreated:'',
    };
    this.reportService.add(report).subscribe({
      // observer object
      next: (report: Report) => {
        // server should be returning report with new id
        report.id > 0
          ? (this.msg = `PO ${report.id} added!`)
          : (this.msg = 'PO not added! - server error');
        this.reportno = report.id;
      },
      error: (err: Error) => (this.msg = `Report not added! - ${err.message}`),
      complete: () => {
        this.hasProducts = false;
        this.pickedVendor = false;
        this.pickedProduct = false;
        this.pickedQty = false;
        this.generated = true;
      },
    });
  } // createReport

  viewPdf(): void {
    window.open(`${PDFURL}${this.reportno}`, '');
  } // viewPdf
} // GeneratorComponent
