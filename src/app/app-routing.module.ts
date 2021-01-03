import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthenticationGuard } from './modules/authentication/authentication.guard';

const routes: Routes = [ {
  path: 'chat',canActivate:[AuthenticationGuard],
  loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule)
},
{
  path: 'login', 
  loadChildren: () => import('./modules/authentication/authentication.module').then(m =>m.AuthenticationModule)
},
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path: '404',
  component: ErrorComponent
}, {
  path: '**',
  redirectTo: '404'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
