import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Http } from '@angular/http';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {
  users: any[]
  length:any

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private http: Http
  ) { }

  ngOnInit() {
    this.authService.getComplaints()
    .subscribe(profile => {
      console.log(profile)
      this.users = profile
      this.length = this.users.length
    }, err => {
      console.log(err)
      return false
    })
  }



}
