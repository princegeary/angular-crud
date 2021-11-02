import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { ContactsListItemComponent } from './contacts/contacts-list/contacts-list-item/contacts-list-item.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';

import { AppRoutingModule } from './app-routing.module';
import { ContactViewComponent } from './contacts/contacts-list/contact-view/contact-view.component';
import { ContactViewService } from './shared/contact-view.service'

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactsListComponent,
    ContactsListItemComponent,
    ContactEditComponent,
    ContactViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ContactViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
