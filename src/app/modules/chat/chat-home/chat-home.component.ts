import {   Component,ComponentFactoryResolver,ViewContainerRef, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {
  anotherUser;
  constructor(public globalService:GlobalService, public viewContainerRef: ViewContainerRef, public cfr: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }
  startChat(user,id){
    this.anotherUser=user;
    this.globalService.viewcontainerhelper = this.viewContainerRef;
    this.globalService.startChatting(id,this.viewContainerRef, this.cfr);
  } 
  chatAgain(data,id){
    this.anotherUser=data && data['user1']==this.globalService.userDetails['loginId']?{loginId:data['user2']}:{loginId:data['user1']};
    this.globalService.chatAgain(id);
  } 
 get filterUser() {
    return this.globalService.userList.filter(el=>el.loginId!==this.globalService.userDetails['loginId']); 
  }
}
