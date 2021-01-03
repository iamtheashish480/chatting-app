import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatting-app';
  logout() {
    this.globalService.isLoggedIn = false;
    if (this.globalService.isBrowser) {
      localStorage.removeItem('isLoggedIn');
      this.globalService.selectedChat={};
      localStorage.removeItem('userDetails');
      this.router.navigate(['/']);
    }
  }
  constructor(public globalService: GlobalService, private router: Router) {

  }
}
