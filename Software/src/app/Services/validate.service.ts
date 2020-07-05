import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateUser(user){
    if(user.Roll_No == undefined ||user.Name == undefined ||user.Email_Id == undefined ||user.password == undefined ||user.Contact_No == undefined ){
      return false;
    }
    else{
      return true
    }
  }

  validateRoll_No(Roll_No){
    var re = /^[0-9]{9}$/;
    return re.test(Roll_No);
  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password){
    var re = /^[A-Za-z]\w{5,14}$/;
    return re.test(password);
  }
}
