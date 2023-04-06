import { DatePipe, formatDate, getLocaleMonthNames } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppraisalHistoryModel } from 'src/app/models/employee.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { EmployeReportsService } from 'src/app/services/SetupPages/employe-reports.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';

export class MonthpickerDateAdapter extends NativeDateAdapter {
  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform);
  }

  override parse(value: string): Date | null {
    const monthAndYearRegex = /(10|11|12|0\d|\d)\/[\d]{4}/;
    if (value?.match(monthAndYearRegex)) {
      const parts = value.split('/');
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
    return monthAsString + '/' + year;
  }
}

@Component({
  selector: 'app-appraisal-history',
  templateUrl: './appraisal-history.component.html',
  styleUrls: ['./appraisal-history.component.css'],
  providers: [
    { provide: DateAdapter,
      useClass: MonthpickerDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
  ],
})
export class AppraisalHistoryComponent implements OnInit {

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
  appHist?: AppraisalHistoryModel[]; 

  displayedColumns: string[] = ['effectiveDate', 'oldBasic', 'oldHRA', 'oldTransport', 'oldSRN', 'oldBranch', 'oldSkills', 'oldOthers', 'oldMerits', 'oldTelephone', 'oldFuel', 'oldTicket', 'oldTotal', 
                                'newBasic', 'newHRA', 'newTransport', 'newSRN', 'newBranch', 'newSkills', 'newOthers', 'newMerits', 'newTelephone','newFuel', 'newTicket','revisedTotal', 'remarks'];
  dataSource: any;

  @ViewChild(MatTable) table!: MatTable<AppraisalHistoryModel>;
  @ViewChild('picker') datePickerElement = MatDatepicker;
  @ViewChild('picker1') datePickerElement1 = MatDatepicker;
  constructor(private route: ActivatedRoute, private reportService: EmployeReportsService) { }

  display = true;
  ngOnInit(): void { 
    this.EmpId = +this.route.snapshot.params['id']; 
    this.BindAppraisalList();
  }

  subtractYear(date: Date, year: number) {
    date.setFullYear(date.getFullYear() - year);
    return date;
  }
  BindAppraisalList(): void { 
    var cyear = new Date()
    var currentyear = cyear.toISOString();
    var lyear = this.subtractYear(cyear, 1);
    var lastyear = lyear.toISOString();
    this.reportService.getAppraisalHistory(this.EmpId,lastyear, currentyear)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.appHist = data;
          this.dataSource = new MatTableDataSource<AppraisalHistoryModel>(this.appHist);
        },
        error: (e) => console.error(e)
      });
  }

  search(): void { 
    var fromdate = this.FromMonthAndYear?.toISOString();
    var todate =this.ToMonthAndYear?.toISOString();

    this.reportService.getAppraisalHistory(this.EmpId, fromdate, todate)
      .subscribe({
        next: (data) => {
          this.appHist = data;
          this.dataSource = new MatTableDataSource<AppraisalHistoryModel>(this.appHist);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
