import { NgModule } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import {MatTableExporterModule } from 'mat-table-exporter';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [],
  exports:[
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTableExporterModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatDialogModule
    
  ]
})
export class MaterialModule { }
