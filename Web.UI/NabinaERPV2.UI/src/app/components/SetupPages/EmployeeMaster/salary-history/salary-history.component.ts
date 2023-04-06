import { DatePipe, formatDate, getLocaleMonthNames } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SalaryHistoryModel } from 'src/app/models/employee.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { EmployeReportsService } from 'src/app/services/SetupPages/employe-reports.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';

import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core'; 

//import * as _moment from 'moment';
// // tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment, Moment} from 'moment';

// const moment = _rollupMoment || _moment;

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// }; 

export class MonthpickerDateAdapter extends NativeDateAdapter {

  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform);
  }

  override parse(value: string): Date | null {
    
    const monthAndYearRegex = /(10|11|12|0\d|\d)\/[\d]{4}/;
    if (value?.match(monthAndYearRegex)) {
      const parts = value.split('-');
      const month = Number(parts[0]);
      const year = Number(parts[1]);
      if (month > 0 && month <= 12) {
        return new Date(year, month - 1);
      }
    }
    return null;
  }

  override format(date: Date, displayFormat: any): string {

    const month = date.getMonth() + 1;
    const monthAsString = ('0' + month).slice(-2);
    const year = date.getFullYear();
    return monthAsString + '-' + year;
  }
}

@Component({
  selector: 'app-salary-history',
  templateUrl: './salary-history.component.html',
  styleUrls: ['./salary-history.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MonthpickerDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
  ],
})

export class SalaryHistoryComponent implements OnInit {

  @Input()
  public FromMonthAndYear: Date | null = null;
  public ToMonthAndYear: Date | null = null;

  @Output()
  public FromMonthAndYearChange = new EventEmitter<Date | null>();
  public ToMonthAndYearChange = new EventEmitter<Date | null>();

  public FromEmitDateChange(event: MatDatepickerInputEvent<Date | null, unknown>): void {
    this.FromMonthAndYearChange.emit(event.value);
  }

  public ToEmitDateChange(event: MatDatepickerInputEvent<Date | null, unknown>): void {
    this.ToMonthAndYearChange.emit(event.value);
  }

  public FromMonthChanged(value: any, widget: any): void {
    this.FromMonthAndYear = value;
    widget.close();
  }

  public ToMonthChanged(value: any, widget: any): void {
    this.ToMonthAndYear = value;
    widget.close();
  }

  EmpId: number = 0;
  BraId: number = 0;
  salHist?: SalaryHistoryModel[];

  displayedColumns: string[] = ['payDate', 'days', 'entitledBasicSalary', 'basicSalary', 'otAmount', 'hra', 'transport', 'fuel', 'telephone', 'branch', 'ticket', 'seniority', 'skill', 'merit', 'other', 'totalAllowance', 'cashAdvance', 'lateAmount', 'vehicleLoan', 'otherDeduction', 'totalDeduction', 'netPayable'];
  dataSource: any;

  @ViewChild(MatTable) table!: MatTable<SalaryHistoryModel>;
  @ViewChild('picker') datePickerElement = MatDatepicker;
  @ViewChild('picker1') datePickerElement1 = MatDatepicker;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private reportService: EmployeReportsService, private datePipe: DatePipe) { }

  display = true
  ngOnInit(): void {
    this.EmpId = +this.route.snapshot.params['id'];
    this.BindSalaryList();
    // this.getTotalCost();
  }
  subtractYear(date:Date, year:number)
  {
   date.setFullYear(date.getFullYear()-year);
   return date;
  }

  BindSalaryList(): void {
   
    var cyear = new Date()
    var currentyear = cyear.toISOString();
    var lyear = this.subtractYear(cyear,1);
    var lastyear = lyear.toISOString();

    this.reportService.getSalaryHistory(this.EmpId,lastyear, currentyear)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.salHist = data;
          this.dataSource = new MatTableDataSource<SalaryHistoryModel>(this.salHist);
        },
        error: (e) => console.error(e)
      });
  }

  search(): void { 
    var fromdate = this.FromMonthAndYear?.toISOString();
    var todate = this.ToMonthAndYear?.toISOString();

    this.reportService.getSalaryHistory(this.EmpId, fromdate, todate)
      .subscribe({
        next: (data) => {
          this.salHist = data;
          this.dataSource = new MatTableDataSource<SalaryHistoryModel>(this.salHist);
          console.log(data);
        },
        error: (e) => console.error(e)
      });

  }
  // getTotalCost():void {
  //   return this.dataSource.map(t => t.days).reduce((acc, value) => acc + value, 0);
  // }

  resetFilter() {
    this.display = false;
    setTimeout(() => {
      this.display = true;
    }, 1)

  }

}

