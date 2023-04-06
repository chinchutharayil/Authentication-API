import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeePopupComponent } from '../../Common/employee-popup/employee-popup.component';

@Component({
  selector: 'app-termination-master',
  templateUrl: './termination-master.component.html',
  styleUrls: ['./termination-master.component.css']
})
export class TerminationMasterComponent implements OnInit {

  terminationDetails!:FormGroup

  terminationRequest:any={}

  @ViewChild('status') status!: ElementRef; 
  selectedStatus = 0;
  onChangeType(): void {  
    this.selectedStatus = this.status.nativeElement.value;
  }
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.terminationDetails = new FormGroup({}) 
  }

  openDialog() {
    const popup=  this.dialog.open(EmployeePopupComponent, {
        width: '60%', height: '70%',
        enterAnimationDuration: '1000ms', exitAnimationDuration: '1000ms',
        data: {
          name: 'abhi', type: 'bhi' 
        }
      });
  popup.afterClosed().subscribe(empdata =>{
  console.log(empdata);
  });
    }

}
