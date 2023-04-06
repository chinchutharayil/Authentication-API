export class LeaveRequestModel {
    id:any;
    employeeId:any;
    endDate:any; 
    startDate:any;
    requestedDays:any;
    approvedDays:any;
    airfareGranted:any;
    daysOverStayed:any;
    destination:any;
    salaryGranted:any; 
    purpose:any;
    requestedDate:any;
    validatedDate:any;
    approveOrRejectDate:any;
    status:any;
    approval:any;
    signedBy:any;
    vacationType:any;
    isSettlementThruPayroll:any;  

    empDepartment?: any;
    empDesignation?: any;
    empNationality?:any;
    empStatus?:any;
    empNo?:any;
    entitledLeave?:any;
    destinationAirport?:any;
    rpnumber?:any;
    rpvalDate?:any;
    empRemarks?:any;
    hrRemarks?:any;
    prRemarks?:any;
    accRemarks?:any;
    //accounts section
    dateOfRejoin:any;
    

}

export class DutyResumeModel {

  id :any;
  vacationRequestId :any;
  dutyResumeDate :any;
  passportSubmitted :any;
  resumeRequestSubmittedDate :any;
  exceededDays:any;
  requestDate :any;
  validateDate :any;
  approveOrRejectDate :any;
  validateRemarks :any;
  approveOrRejectRemarks :any;
  approvalStatus :any;
  isEmployeeRejoinDateUpdate:any;
  isEmployeeDateOfPassageUpdated:any;
  dateOfPassage :any;
  addedBy :any;
  addedWhen :any;
  updatedBy :any;
  updatedWhen :any;

}

export class TerminationModel {
}

