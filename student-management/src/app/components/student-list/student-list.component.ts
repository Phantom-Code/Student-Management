import { Component, OnInit } from "@angular/core";
import { StudentDataService } from "../../services/student-data.service";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.scss"],
})
export class StudentListComponent implements OnInit {
  data: any[] = [];
  totalStudents: number;
  currentPage: number = 0;
  itemsPerPage: number = 10;
  // lenth of page number in pagination comp
  maxSize: number = 5;
  loading: boolean = false;
  constructor(private studentService: StudentDataService) {}
  ngOnInit(): void {
    this.loading = true;
    this.studentService
      .getStudentsByLimit(0, this.itemsPerPage)
      .subscribe((resp: any) => {
        this.data = [...resp.body];
        this.loading = false;
      });
    this.studentService.getAllStudents().subscribe((data: any) => {
      this.totalStudents = data.body.length;
      this.loading = false;
    });
  }
  pageSwitched(event) {
    this.loading = true;
    this.studentService
      .getStudentsByLimit(
        (event.page - 1) * this.itemsPerPage,
        this.itemsPerPage
      )
      .subscribe((resp: any) => {
        this.data = [...resp.body];
        this.loading = false;
      });
  }
}
