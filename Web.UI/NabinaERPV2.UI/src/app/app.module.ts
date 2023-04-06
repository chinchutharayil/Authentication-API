import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, DepartmentRComponents, SectionRComponents, DesignationRComponents,EmployeeComponents,DutyResumeComponents,
         LeaveRequestComponents, TerminationComponents, CommonComponents} from './app-routing.module';
import { AppComponent }  from './app.component'; 
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from './Material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatGridListModule } from '@angular/material/grid-list'; 

@NgModule({
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    BrowserModule, 
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatGridListModule
    
  ],
  declarations: [
    AppComponent,   
    DashboardComponent, 
    DepartmentRComponents,
    SectionRComponents,
    DesignationRComponents,
    EmployeeComponents,
    DutyResumeComponents,
    LeaveRequestComponents,
    TerminationComponents, 
    CommonComponents
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
