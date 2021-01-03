import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { SharedModule } from '../shared/shared.module';
import { NewChatComponent } from './new-chat/new-chat.component';


@NgModule({
  declarations: [ChatHomeComponent,NewChatComponent,
    ChatWindowComponent],
  imports: [
    CommonModule,ChatRoutingModule,FormsModule,ReactiveFormsModule,SharedModule
  ]
})
export class ChatModule { }
