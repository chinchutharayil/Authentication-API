import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-termination-search',
  templateUrl: './termination-search.component.html',
  styleUrls: ['./termination-search.component.css']
})
export class TerminationSearchComponent implements OnInit {

  NationalityList:any;
  // termination?:  

  @ViewChild('natlist') natlist!: ElementRef;
  selectedNational = 0;
  onSelectedNational(): void {
    this.selectedNational = this.natlist.nativeElement.value;
  }
  @ViewChild('status') status!: ElementRef; 
  selectedStatus = 0;
  onChangeStatus(): void {  
    this.selectedStatus = this.status.nativeElement.value;
  }
  displayedColumns: string[] = ['action', 'id', 'empNo', 'empName','empNationality', 'status'];
  dataSource: any; 
  
  constructor() { }

  ngOnInit(): void {
  }


  search(){}
}
