import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { ProductListComponent } from './product-list/product-list.component';
@NgModule({
  declarations: [ProductDetailComponent,ProductHomeComponent, ProductListComponent],
  imports: [
    CommonModule, MatComponentsModule,ReactiveFormsModule,MatExpansionModule
  ]
})
export class ProductModule { }