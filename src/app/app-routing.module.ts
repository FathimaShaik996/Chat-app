import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { MessageDetailsComponent } from '../message-details/message-details.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'message/:id', component: MessageDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
