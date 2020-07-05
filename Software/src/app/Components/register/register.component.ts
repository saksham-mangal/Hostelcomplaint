import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/Services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Name: String
  Roll_No: String
  Email_Id: String
  Password: String
  Contact_No: String
  constructor(
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    var user = {
      Name: this.Name,
      Email_Id: this.Email_Id,
      Roll_No: this.Roll_No,
      Password: this.Password,
      Contact_No: this.Contact_No
    }

    //Register User
    this.authService.registerUser(user)
    .subscribe(data => {
      if(!data.success){
        this.flashMessages.show('You are now successfully Registered and can log in', {cssClass: 'alert-success', timeout: 2000})
        this.router.navigate(['/login'])
      }
      else{
        this.flashMessages.show('Username already exists. Please use another username', {cssClass: 'alert-danger', timeout: 2000})
        this.router.navigate(['/register'])
      }
    })
  }

}
