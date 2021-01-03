import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public loading: boolean = false; //shows progress circle
  public submitted: boolean = false; //indicates form submission
  private returnUrl: string = '';
  public passwordType: string = 'password';
  public errorMessage: string = "";

  constructor(private formBuilder: FormBuilder, private globalService: GlobalService, private route: ActivatedRoute,
    private router: Router) {
    // redirect to home if already logged in
    //   if (this.authenticationService.currentUserValue) { 
    //       this.router.navigate(['/']);
    //   }
    if (this.globalService.isBrowser) {
      let isLogged = localStorage.getItem('isLoggedIn');
      if (isLogged && isLogged == "true") {
        this.router.navigate(['/chat']);
      }
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      rememberMe: [false, Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // for dummy login
    if (this.globalService.checkLogIn(this.f.username.value, this.f.password.value)) {
      //             this.loading = false;
      this.globalService.isLoggedIn = true;
      if (this.globalService.isBrowser) {
        localStorage.setItem('isLoggedIn', "true");
      }
      this.returnUrl = "/chat";
      this.router.navigate([this.returnUrl]);
    } else {
      this.errorMessage = "Please enter correct credentials";
    }
  }
}
