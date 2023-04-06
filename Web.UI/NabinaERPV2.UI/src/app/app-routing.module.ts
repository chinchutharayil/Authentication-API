import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddSectionComponent } from './components/SetupPages/add-section/add-section.component';
import { SectionListComponent } from './components/SetupPages/section-list/section-list.component'; 
import { DepartmentAddComponent } from './components/SetupPages/department-add/department-add.component';
import { DepartmentListComponent } from './components/SetupPages/department-list/department-list.component';
import { EmployeeSearchComponent } from './components/SetupPages/EmployeeMaster/employee-search/employee-search.component';
import { EmployeeMasterComponent } from './components/SetupPages/EmployeeMaster/employee-master/employee-master.component';
import { AddDesignationComponent } from './components/SetupPages/add-designation/add-designation.component'; 
import { DesignationsListComponent } from './components/SetupPages/designation-list/designation-list.component';
import { DutyResumeSearchComponent } from './components/DutyResume/duty-resume-search/duty-resume-search.component'; 
import { OfficialDocumentsComponent } from './components/SetupPages/EmployeeMaster/official-documents/official-documents.component';
import { ContactInformationComponent } from './components/SetupPages/EmployeeMaster/contact-Information/contact-Info.component';
import { LeaveHistoryComponent } from './components/SetupPages/EmployeeMaster/leave-history/leave-history.component';
import { SalaryHistoryComponent } from './components/SetupPages/EmployeeMaster/salary-history/salary-history.component';
import { AppraisalHistoryComponent } from './components/SetupPages/EmployeeMaster/appraisal-history/appraisal-history.component';
import { EmployeeSalaryComponent } from './components/SetupPages/EmployeeMaster/salary-info/salary-info.component';
import { EmpEntitlementComponent } from './components/SetupPages/EmployeeMaster/emp-entitlement/emp-entitlement.component';
import { DutyResumeMasterComponent } from './components/DutyResume/duty-resume-master/duty-resume-master.component';
import { HeadOfDepartmentComponent } from './components/DutyResume/duty-resume-master/head-of-department/head-of-department.component';
import { PersonnelDepartmentComponent } from './components/DutyResume/duty-resume-master/personnel-department/personnel-department.component';
import { AccountsDeptComponent } from './components/DutyResume/duty-resume-master/accounts-dept/accounts-dept.component';
import { ManagementApprovalComponent } from './components/DutyResume/duty-resume-master/management-approval/management-approval.component';   
import { LeaveRequestMasterComponent } from './components/LeaveRequest/leave-request-master/leave-request-master.component';
import { LeaveRequestSearchComponent } from './components/LeaveRequest/leave-request-search/leave-request-search.component';
import { TerminationMasterComponent } from './components/TerminationRequest/termination-master/termination-master.component';
import { TerminationSearchComponent } from './components/TerminationRequest/termination-search/termination-search.component';
import { EmployeePopupComponent } from './components/Common/employee-popup/employee-popup.component';
import { EmployeeHeaderComponent } from './components/Common/employee-header/employee-header.component';


const routes: Routes = [
  { path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'designationsearch', component: DesignationsListComponent},
  { path: 'designation/:id', component: AddDesignationComponent },
  { path: 'designation', component: AddDesignationComponent },
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'sectionsearch', component: SectionListComponent },
  { path: 'section/:id', component: AddSectionComponent },
  { path: 'section', component: AddSectionComponent },
  { path: 'departmentsearch', component:DepartmentListComponent},
  { path: 'department/:id', component:DepartmentAddComponent},
  { path: 'department', component:DepartmentAddComponent},
  { path: 'EmployeeSearch', component: EmployeeSearchComponent },
  { path: 'EmployeeMaster', component: EmployeeMasterComponent},
  { path: 'EmployeeMaster/:id', component: EmployeeMasterComponent },
  { path: 'DutyResumeSearch', component: DutyResumeSearchComponent },
  { path: 'DutyResumeMaster', component: DutyResumeMasterComponent },
  { path:'LeaveRequestSearch', component:LeaveRequestSearchComponent},
  { path:'LeaveRequest', component:LeaveRequestMasterComponent},
  { path:'TerminationRequestSearch', component:TerminationSearchComponent},
  { path:'TerminationRequest', component:TerminationMasterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const DesignationRComponents = [AddDesignationComponent, DesignationsListComponent];
export const DepartmentRComponents = [DepartmentListComponent, DepartmentAddComponent];
export const SectionRComponents = [AddSectionComponent,SectionListComponent];
export const EmployeeComponents = [EmployeeSearchComponent,EmployeeMasterComponent, EmployeeSalaryComponent,EmpEntitlementComponent, OfficialDocumentsComponent, ContactInformationComponent, LeaveHistoryComponent, SalaryHistoryComponent, AppraisalHistoryComponent];
export const DutyResumeComponents = [DutyResumeSearchComponent, DutyResumeMasterComponent,HeadOfDepartmentComponent,PersonnelDepartmentComponent,AccountsDeptComponent, ManagementApprovalComponent];
export const LeaveRequestComponents =[LeaveRequestSearchComponent, LeaveRequestMasterComponent ]
export const TerminationComponents = [TerminationMasterComponent,TerminationSearchComponent];
export const CommonComponents =[EmployeePopupComponent, EmployeeHeaderComponent ]