import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  chatGroup: FormGroup;
  @Input()anotherUser:any;
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
    this.globalService.submitMessage(this.chatGroup.controls.message.value,this.globalService.userDetails['loginId'],
    this.anotherUser['loginId']);
  }

}
