import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent {

  newUserDetails;
  closecomponent(): void {
    this.globalService.viewcontainerhelper.clear();
  }
  chatGroup: FormGroup;
  constructor(public globalService: GlobalService, public fb: FormBuilder) {
    this.chatGroup = this.fb.group({
      message: ['', Validators.required],
    });
  }

  public sendMesage(): void {
    console.log(this.chatGroup.controls.message.value);

    // stop here if form is invalid
    if (this.chatGroup.invalid) {
      return;
    }
    // console.log()
    this.globalService.submitMessage(this.chatGroup.controls.message.value,this.globalService['userDetails']['loginId'],
    this.newUserDetails['loginId'],'close');
  }
}
