import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,AuthenticationRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
