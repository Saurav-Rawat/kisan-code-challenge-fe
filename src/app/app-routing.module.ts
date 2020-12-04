import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ListOfContactsComponent } from './list-of-contacts/list-of-contacts.component';
import { MessageListComponent } from './message-list/message-list.component';
import { SendMessageComponent } from './send-message/send-message.component';

const routes: Routes = [
  { path: '', component: ListOfContactsComponent },
  { path: 'contact-details/:id', component: ContactDetailsComponent },
  { path: 'send-message/:id', component: SendMessageComponent },
  { path: 'message-list', component: MessageListComponent },
  { path: 'otp-verification', component: SendMessageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
