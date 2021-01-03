import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public isLoggedIn: boolean = false;
  public userDetails: Object ;
  viewcontainerhelper;
  userList = [{ 'user': "admin", "loginId": "1", "password": "admin@123" }, { 'user': "new", "loginId": "2", "password": "admin@123" },
  { 'user': "newuser", "loginId": "3", "password": "admin@123" }
  ]
  chatList: Array<any> = [];
  selectedChat: Object;
  isBrowser: boolean = false;
  constructor(@Inject(PLATFORM_ID) platformId: string) {
    if (isPlatformBrowser(platformId)) {
      this.isBrowser = true;
      if (this.getData('userDetails')) {
        this.userDetails = JSON.parse(this.getData('userDetails'));
      }
      if (this.getData('isLoggedIn')) {
        this.isLoggedIn = JSON.parse(this.getData('userDetails'));
      }
      if (this.getData('chatList')) {
        this.chatList = JSON.parse(this.getData('chatList'));
      }
      if (this.getData('userList')) {
        this.userList = JSON.parse(this.getData('userList'));
      }
    }

  }
  public checkLogIn(userName, password) {
    let flag = false;
    for (let index = 0; index < this.userList.length; index++) {
      const element = this.userList[index];
      if (element['user'] == userName && element['password'] === password) {
        flag = true;
        this.setData('userDetails', element);
        this.setData('isLoggedIn', true);
        this.userDetails = element;
        this.isLoggedIn = true;
      }
    }
    return flag;
  }
  chatAgain(id) {
    for (let index = 0; index < this.chatList.length; index++) {
      const element = this.chatList[index];
      if (element['id']==id) {
        this.selectedChat = element;
        break;
      }
    }
  }
  toggleLike(messageId,sender,reciever){
    for (let index = 0; index < this.chatList.length; index++) {
      const element = this.chatList[index];
      if (element && this.userDetails &&  ((element['user2'] == sender ||element['user1'] == sender) && (element['user2'] == reciever ||element['user1'] == reciever) )) {
        element['chat'].forEach(elem => {
          if(elem['messageId']==messageId){
            elem['isLiked']=!elem['isLiked'];
          }
        });
        this.selectedChat = element;
        this.setData('chatList', this.chatList);
        break;
      }}
  }
  async startChatting(id, viewcontain?: any, cfr?: any) {
    if (this.chatList.length == 0) {
      viewcontain.clear();
      const { NewChatComponent } = await import('../modules/chat/new-chat/new-chat.component');
      let cmpRef = viewcontain.createComponent(
        cfr.resolveComponentFactory(NewChatComponent)
      );
      cmpRef.instance.newUserDetails = this.userList.filter(el => el['loginId'] == id)[0];
      return cmpRef; return;
    }
    for (let index = 0; index < this.chatList.length; index++) {
      const element = this.chatList[index];
      if (element && this.userDetails &&  ((element['user2'] == id ||element['user1'] == id) && (element['user2'] == this.userDetails['loginId'] ||element['user1'] == this.userDetails['loginId']) )) {
        this.selectedChat = element;
        break;
      } else if (index == this.chatList.length - 1) {
        viewcontain.clear();
        const { NewChatComponent } = await import('../modules/chat/new-chat/new-chat.component');
        let cmpRef = viewcontain.createComponent(
          cfr.resolveComponentFactory(NewChatComponent)
        );
        cmpRef.instance.newUserDetails = this.userList.filter(el => el['loginId'] == id)[0];
        return cmpRef;
        break;
      }

    }
  }
  submitMessage(message: string, user1Id, user2Id, type?: any) {
   console.log(message,user1Id,user2Id);
    if (this.chatList.length == 0) {
      let element = {
        id: this.chatList.length, user1: user1Id,user1Name:this.userList.filter(el=>el['loginId']==user1Id)[0]['user'],user2Name:this.userList.filter(el=>el['loginId']==user2Id)[0]['user'], user2: user2Id, chat: [
          {
            message: message, sendingTime: new Date(), sender: user1Id, reciever: user2Id, recievingTime: '',
            messageId: 0 + "-" + 0,isLiked:false
          }
        ]
      };
      this.chatList.push(element); this.selectedChat = element;
      this.setData('chatList', this.chatList); if (type == 'close') {
        this.viewcontainerhelper.clear();

      } return;
    }
    for (let index = 0; index < this.chatList.length; index++) {
      const element = this.chatList[index];
      if (element && ((element['user2'] == user1Id ||element['user1'] == user1Id)
      && (element['user2'] == user2Id ||element['user1'] == user2Id) )) {
        element.chat.push({
          message: message, sendingTime: new Date(), sender: user1Id, reciever: user2Id, recievingTime: '',
          messageId: index + "-" + element.chat.length,isLiked:false
        });
        this.selectedChat = element;
        this.setData('chatList', this.chatList);
        if (type == 'close') {
          this.viewcontainerhelper.clear();

        }
        break;
      } else if (index == this.chatList.length - 1) {
        this.chatList.push({
          id: this.chatList.length, user1: user1Id,user1Name:this.userList.filter(el=>el['loginId']==user1Id)[0]['user'],user2Name:this.userList.filter(el=>el['loginId']==user2Id)[0]['user'], user2: user2Id, chat: [
            {
              message: message, sendingTime: new Date(), sender: user1Id, reciever: user2Id, recievingTime: '',
              messageId: index + "-" + 0,isLiked:false
            }
          ]
        }); if (type == 'close') {
          this.viewcontainerhelper.clear();

        }
      }
    }
  }
  setData(id: string, data: any): void {
    if (this.isBrowser) {
      localStorage.setItem(id, JSON.stringify(data));
    }
  }
  getData(id: string) {
    if (this.isBrowser) {
      return localStorage.getItem(id);
    }
  }
}
