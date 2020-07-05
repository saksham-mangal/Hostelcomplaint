import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-all-complaints',
  templateUrl: './all-complaints.component.html',
  styleUrls: ['./all-complaints.component.css']
})
export class AllComplaintsComponent implements OnInit {

  users:any[]
  length: any
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.authService.getAllComplaints()
    .subscribe(profile => {
      this.users = profile
      this.length = this.users.length
    }, err => {
      console.log(err)
      return false
    })
  }

}
