import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactViewService {
  contactChanged = new EventEmitter<Contact>();
  private contact: Contact = new Contact(1, "Juan Dela Cruz", "juan.dela.cruz@accenture.com", "1234567890");

  constructor() { }

  onContactToViewAdded(contact: Contact) {
    this.contact = contact;
    this.contactChanged.emit(this.contact);
    console.log(contact);
  }



}
