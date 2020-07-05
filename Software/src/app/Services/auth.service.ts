import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any
  user: any
  constructor(
    private http: Http,
    private jwtHelper: JwtHelperService
  ) { }

  registerUser(user){
    let headers = new Headers({'Content-type': 'application/json'})
    return this.http.post('http://localhost:3000/lodging/register', user, {headers: headers})
    .pipe(map(resp => resp.json()))
  }

  lodgeComplaint(user){
    let headers = new Headers({'Content-type': 'application/json'})
    return this.http.post('http://localhost:3000/lodging/lodge', user, {headers: headers})
    .pipe(map(resp => resp.json()))
  }

  authenticateUser(user){
    let headers = new Headers({'Content-Type': 'application/json'})
    return this.http.post('http://localhost:3000/lodging/authenticate', user, {headers: headers})
    .pipe(map(resp => resp.json()))
  }

  getComplaints(){
    let headers = new Headers({'Content-Type': 'application/json'})
    this.loadToken()
    headers.append('Authorization', this.authToken)
    return this.http.get('http://localhost:3000/lodging/complaint', {headers: headers})
    .pipe(map(resp => resp.json()))
  }

  getAllComplaints(){
    let headers = new Headers({'Content-Type': 'application/json'})
    return this.http.get('http://localhost:3000/lodging/allcomplaints', {headers: headers})
    .pipe(map(resp => resp.json()))
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  loadToken(){
    var token = localStorage.getItem('id_token')
    this.authToken = token
  }

  loggedIn(){
    let token = localStorage.getItem('id_token')
    return !this.jwtHelper.isTokenExpired(token)
  }

  isAdmin(){
    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    if(user[0]){
      return false
    }
    else return true
    
  }

  logout(){
    this.authToken = null
    this.user = null
    localStorage.clear()
  }
}
