/**
 * @author Sourabh Kanwade
 * @email sourabhkanwade10@gmail.com
 * @create date 2021-09-07
 * @modify date 2021-09-07
 * @desc Retrieves data from server displays and passes to template
 */
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
  // length of page number in pagination component
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
