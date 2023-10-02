import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { TechnicalComponent } from './components/technical/technical.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
@NgModule({
  declarations: [
    AppComponent,
    TechnicalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    ConfirmationPopoverModule.forRoot({
    confirmButtonType: 'danger',
    popoverMessage:'Do you want to really delete?',
    popoverTitle:'Delete Confirmation',
    placement:'left-bottom'
  }),
    ToastrModule.forRoot({
    positionClass:"toast-bottom-right",
    timeOut: 4000
  }),
  BrowserAnimationsModule,
  ReactiveFormsModule,
  MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
