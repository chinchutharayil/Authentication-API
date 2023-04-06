import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionService } from 'src/app/services/SetupPages/section.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { SectionModel } from 'src/app/models/setup-pages.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SectionListComponent>;

  displayedColumns: string[] = ['action','id', 'name', 'isActive', 'sortOrder'];
  dataSource: any;

  sections?: SectionModel[];
  currentsections: SectionModel = {};
  currentIndex = -1;
  name = null;
  sorder = null;

  constructor(private sectionService: SectionService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveSection();
  }

  retrieveSection(): void {
    this.sectionService.getAll()
      .subscribe({
        next: (data) => {
          this.sections = data;
          this.dataSource = new MatTableDataSource<SectionModel>(this.sections);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveSection();
    this.currentsections = {};
    this.currentIndex = -1;
  }

  setActiveSection(section: SectionModel, index: number): void {
    this.currentsections = section;
    this.currentIndex = index;
  }

  searchTitle(): void {
    debugger
    this.currentsections = {};
    this.currentIndex = -1;

    this.sectionService.findByTitle(this.name, this.sorder)
      .subscribe({
        next: (data) => {
          this.sections = data;
          this.dataSource = new MatTableDataSource<SectionModel>(this.sections);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  goToAddPage(): void {
    this.router.navigate(['add']);
  }

}
