import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css']
})
export class ComplaintFormComponent implements OnInit {

  Roll_No: String
  Room_No: String
  Complaint_Type: String
  Complaint_Details: String

  constructor(
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickSubmit(){
    var user = {
      Roll_No: this.Roll_No,
      Room_No: this.Room_No,
      Complaint_Type: this.Complaint_Type,
      Complaint_Details: this.Complaint_Details
    }

    this.authService.lodgeComplaint(user)
    .subscribe(data => {
      if(!data.success){
        this.flashMessages.show('Complaint has been Successfully lodged.', {cssClass: 'alert-success', timeout: 2000})
        this.router.navigate(['complaint'])
      }
      else{
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 2000})
        this.router.navigate(['/register'])
      }
    })
  }

}
