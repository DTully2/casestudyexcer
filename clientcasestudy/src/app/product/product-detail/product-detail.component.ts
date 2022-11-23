import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';
import { MatExpansionModule } from '@angular/material/expansion';
import { ValidateInt } from '@app/validators/int.validator';
import { DeleteDialogComponent } from '@app/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  // setter
  @Input() selectedProduct: Product = {
    id: 0,
    vendorid: 0,
    name: '',
    costprice: 0.0,
    msrp: 0,
    rop: 0,
    eoq: 0,
    qoh: 0,
    qoo: 0,
    qrcode: '',
    qrcodetxt: '',
    // receipt: false,
    // receiptscan: '',
  };
  selectedVendor: Vendor = {
    id: 0,
    name: '',
    address1: '',
    province: '',
    postalcode: '',
    city: '',
    phone: '',
    type: '',
    email: '',    
  };

  @Input() vendors: Vendor[] | null = null;

  @Input() products: Product[] | null = null;

  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();

  id: FormControl;
  productForm: FormGroup;
  vendorid: FormControl;
  name: FormControl;
  costprice: FormControl;
  msrp: FormControl;
  rop: FormControl;
  eoq: FormControl;
  qoh: FormControl;
  qoo: FormControl;
  //  receipt?: FormControl;
  //  qrcode: FormControl;
   qrcodetxt: FormControl;

  constructor(private builder: FormBuilder, private dialog: MatDialog) {
    this.id = new FormControl(      '',      Validators.compose([        this.uniqueCodeValidator.bind(this),        Validators.required,    ])    );
    this.vendorid = new FormControl(     '',      Validators.compose([Validators.required])    );
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.costprice = new FormControl(      '',      Validators.compose([Validators.required])    );
    this.msrp = new FormControl('', Validators.compose([Validators.required]));
    this.rop = new FormControl('', Validators.compose([Validators.required]));
    this.eoq = new FormControl('', Validators.compose([Validators.required, ValidateInt]));
    this.qoh = new FormControl('', Validators.compose([Validators.required]));
    this.qoo = new FormControl('', Validators.compose([Validators.required]));
    //  this.qrcode= new FormControl(      '',      Validators.compose([Validators.required])    );
     this.qrcodetxt= new FormControl(      '',      Validators.compose([Validators.required])    );

    this.productForm = new FormGroup({
      id: this.id,
      vendorid: this.vendorid,
      // categoryid: this.categoryid,
      name: this.name,
      costprice: this.costprice,
      msrp: this.msrp,
      rop: this.rop,
      eoq: this.eoq,
      qoh: this.qoh,
      qoo: this.qoo,
      // qrcode: this.qrcode,
      qrcodetxt: this.qrcodetxt,
      // description: this.description,s
       //receipt: this.receipt,
      // dateincurred: this.dateincurred,
    });
  } // constructor
  ngOnInit(): void {
    // patchValue doesn't care if all values are present
    this.productForm.patchValue({
      id: this.selectedProduct.id,
      vendorid: this.selectedProduct.vendorid,
      name: this.selectedProduct.name,
      costprice: this.selectedProduct.costprice,
      msrp: this.selectedProduct.msrp,
      rop: this.selectedProduct.rop,
      eoq: this.selectedProduct.eoq,
      qoh: this.selectedProduct.qoh,
      qoo: this.selectedProduct.qoo,
      qrcode: this.selectedProduct.qrcode,
      qrcodetxt: this.selectedProduct.qrcodetxt,
    });
    console.log(this.selectedProduct.qrcode);
  } // ngOnInit
  updateSelectedProduct(): void {
    this.selectedProduct.id = this.productForm.value.id;
    this.selectedProduct.vendorid = this.productForm.value.vendorid;
    this.selectedProduct.name = this.productForm.value.name;
    this.selectedProduct.costprice = this.productForm.value.costprice;
    this.selectedProduct.msrp = this.productForm.value.msrp;
    this.selectedProduct.rop = this.productForm.value.rop;
    this.selectedProduct.eoq = this.productForm.value.eoq;
    this.selectedProduct.qoh = this.productForm.value.qoh;
    this.selectedProduct.qoo = this.productForm.value.qoo;
     this.selectedProduct.qrcode = this.productForm.value.qrcode;
     this.selectedProduct.qrcodetxt = this.productForm.value.qrcodetxt;
    this.saved.emit(this.selectedProduct);
  } // updateSelectedExpense
  /**
   * uniqueCodeValidator - needed access to products property so not
   * with the rest of the validators
   */
  uniqueCodeValidator(control: AbstractControl): { idExists: boolean } | null {
    if (this.products !== undefined) {
      if (
        this.products?.find(
          (p) => p.id === control.value && !this.selectedProduct.id
        ) !== undefined
      ) {
        return { idExists: true };
      }
    }
    return null; // if we make it here there are no product codes
  } // uniqueCodeValidator
  // selectFile(event: Event): void {
  //   const element = event.currentTarget as HTMLInputElement;
  //   let fileList: FileList | null = element.files;
  //   if (fileList) {
  //     const file = fileList[0];
  //     const reader: FileReader = new FileReader();
  //     reader.onloadend = (e) => {
  //       this.selectedProduct.receiptscan = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // } // selectFile
  // setReceipt(): void {
  //   this.selectedProduct.receipt = !this.selectedProduct.receipt;
  // } // setReceipt
  openDeleteDialog(selectedExpense: Product): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: `Delete Expense ${this.selectedProduct.id}`,
      entityname: 'expense',
    };
    dialogConfig.panelClass = 'customdialog';
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleted.emit(this.selectedProduct);
      }
    });
  } // openDeleteDialog
} // ExpenseDetailComponent
