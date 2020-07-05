import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Roll_No: String
  Password: String

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    var user = {
      Roll_No: this.Roll_No,
      Password: this.Password
    }

    this.authService.authenticateUser(user)
    .subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.data)
        this.flashMessages.show('You have successfully logged in.', {cssClass: 'alert-success', timeout: 2000})
        this.router.navigate(['complaint'])
      }
      else{
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 2000})
        this.router.navigate(['login'])
      }
    })
  }

}
