import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class StudentDataService {
  url = "http://localhost:3000/api/students/";
  constructor(private http: HttpClient) {}
  getStudentsByLimit(offset, limit) {
    return this.http.get(this.url, {
      params: new HttpParams().set("offset", offset).set("limit", limit),
      observe: "response",
    });
  }
  getAllStudents() {
    return this.http.get(this.url, { observe: "response" });
  }
  getStudentById(id: string) {
    return this.http.get(this.url + id, { observe: "response" });
  }
  addStudent(studentData) {
    let form_data = new FormData();
    for (let key in studentData) {
      form_data.append(key, studentData[key]);
    }
    return this.http.post(this.url, form_data, { observe: "response" });
  }
  updateStudent(studentData, studentId) {
    let form_data = new FormData();
    for (let key in studentData) {
      form_data.append(key, studentData[key]);
    }
    return this.http.patch(this.url + studentId, form_data, {
      observe: "response",
    });
  }
  deactivateStudent(studentId) {
    return this.http.delete(this.url + studentId, { observe: "response" });
  }
  // get the count of all students( in-active and active)
  getStudentCount() {
    let options = { params: new HttpParams().set("total", "0") };
    return this.http.get(this.url, options);
  }
}
