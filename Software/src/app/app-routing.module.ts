import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ComplaintComponent } from './Components/complaint/complaint.component';
import { AllComplaintsComponent } from './Components/all-complaints/all-complaints.component';
import { ComplaintFormComponent } from './Components/complaint-form/complaint-form.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'complaint', component: ComplaintComponent, canActivate: [AuthGuard]},
  {path: 'all-complaints', component: AllComplaintsComponent, canActivate: [AuthGuard]},
  {path: 'complaint-form', component: ComplaintFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
