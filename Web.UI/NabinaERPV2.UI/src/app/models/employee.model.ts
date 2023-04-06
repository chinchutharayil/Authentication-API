import { EmailValidator } from "@angular/forms"; 

export class EmployeeModel {
  Id?: any;
  code?:any;
  empNo?: string;
  firstName?: any;
  secondName?:any;
  lastName?:any;
  firstNameAr?: string;
  lastNameAr?: string;
  secondNameAr?: string;
  email?: string;
  mobileNumber?: string;
  visaNo?:any;
  countryId?: any;

  departmentId?: any;
  designationId?: any;
  sectionId?: any;
  designation?: string;
  nationalityId?: any;
  salaryCategoryId?: any;
  sponsorId?: any;
  status?: boolean;
  age?: any;
  gender?: any;
  basicSalary?:any;

  rpnumber?: any;
  companyid?: any;
  companyBranchId?:any;
  gradeId?:any;
  isManager?: boolean;
  managerId?: any;
  categoryId?: any;
  bankBranchId?: any;
  basic?: any;
  hra?: any;
  seniorityAllowance?: any;
  srallowance?: any;
  branchAllowance?: any;
  fuelAllowance?:any;
  ticketAllowance?:any;
  meritAlllowance?: any;
  telephoneAllowance?: any;
  skillallowance?: any;
  meritAllowance?: any;
  otherAllowance?: any;
  accomodation?:any;
  transportAllowance?:any;
  unitId?:any;
  accomodationId?:any;
  skillAllowance?:any;
  totalSalary?:any;

  gratuityAdvance?: any;
  lopDays?: any;
  airticketFare?: any;
  overtimestatus?: boolean;
  shiftStatus?: boolean;
  Cbstrightshift?: boolean;
  Cbovertime?: boolean;
  Cbairfare?: boolean; 
  overtimeStatus?: boolean;
  isEligibleforAirfare?: boolean;

  gratuityEffectiveDate?:any;
  
  bankAccntNo?: any;
  joiningDate?: any;
  dateOfBirth?: any;
  arrivalDate?: any;
  dateOfPassage?: any;
  lastdutydate?:any;
  leavingDate?: any;
  dateofRejoin?:any;
  doc?: any;
  document?: any;
  empDepartment?: any;
  empDesignation?: any;
}

export class EmployeOfficalDocsModel {     
  id?: any;
  name?: string;
  empid?: string;
  officialDocumentId?: string;
  documentNumber?: string;
  document?:any;
  issueDate:any;
  expiryDate:any;
  remarks?:any;
  isActive: boolean = false;   
} 


export class ContactInfoModel {     
  id?: any;
  empid?: string;
  contactPersonName?: string;
  contactPersonNumber?: string;
  email?: string;
  contact?: string;
  contactAddress?: string;
  countryId?:any; 
  remarks?:any;   
}


export class SalaryHistoryModel {     
  id?: any;
  months?: string;
  days?: number;
  basic?:number;
  basicPayable?: number;
  OTPay?: number;
  hra?: number; 
  transport?: number;
  fuel?: number;
  telephone?: number;
  branch?: number;
  ticket?: number;
  seniority?: number;
  skills?: number;
  merits?: number;
  others?: number;
  totalAllowance?:number;
  cashAdvance?: number;
  lateAmount?: number;
  vehicleLoan?: number;
  otherDeduction?: number;
  totalDeduction?: number;
  netPayable?: number;
}
export class LeaveHistoryModel{ }

export class AppraisalHistoryModel{ }