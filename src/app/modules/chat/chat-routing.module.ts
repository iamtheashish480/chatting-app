import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatHomeComponent } from './chat-home/chat-home.component';

const routes: Routes = [
    {path: '',component: ChatHomeComponent}, 
    {path: '',redirectTo: '',pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ChatRoutingModule { }
