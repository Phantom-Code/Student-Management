/**
 * @author Sourabh Kanwade
 * @email sourabhkanwade10@gmail.com
 * @create date 2021-09-07
 * @modify date 2021-09-07
 * @desc Updates selected student by sending request to database
 */

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertComponent } from "ngx-bootstrap/alert";
import { StudentDataService } from "../../../services/student-data.service";

@Component({
  selector: "app-edit-student",
  templateUrl: "./edit-student.component.html",
  styleUrls: ["./edit-student.component.scss"],
})
export class EditStudentComponent implements OnInit {
  studentId: string;
  alerts: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get("id");
  }

  updateStudent(event) {
    this.studentService
      .updateStudent(event, this.studentId)
      .subscribe((resp: any) => {
        if (resp.status) {
          this.alerts.push({
            type: "success",
            msg: resp.body.message,
            timeout: 4000,
          });
        } else {
          this.alerts.push({
            type: "danger",
            msg: "Something Went Wrong!",
            timeout: 4000,
          });
        }
      });
  }
  onClosed(dismissedAlert: AlertComponent) {
    this.router.navigate(["/students"]);
    this.alerts = this.alerts.filter((alert) => alert != dismissedAlert);
  }
}
