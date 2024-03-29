
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// added imports
import { MatComponentsModule } from './mat-components/mat-components.module';
import { HomeComponent } from './home/home.component';
import { VendorModule } from './vendor/vendor.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductModule } from './product/product.module';
import { ReportModule } from './report/report.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
 declarations: [
 AppComponent,
 HomeComponent,
 DeleteDialogComponent
 ],
 imports: [
 BrowserModule,
 AppRoutingModule,
 BrowserAnimationsModule,
 HttpClientModule,
 MatComponentsModule,
 ReactiveFormsModule,
 VendorModule,
 ProductModule,
    ReportModule
 
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }
