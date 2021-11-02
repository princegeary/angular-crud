import { Contact } from "./contact.model"
import { EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ContactViewService } from '../shared/contact-view.service';

@Injectable({ providedIn: 'root' })
export class ContactService {
  startUpdating = new Subject<number>();
  startViewing = new Subject<number>();
  contactsChanged = new EventEmitter<Contact[]>();
  contactsListUpdated = new EventEmitter<boolean>();

  url = 'https://jsonplaceholder.typicode.com/users';

  private contacts: Contact[] = [];
  viewcontact: Contact;


  constructor(private http: HttpClient, private viewService: ContactViewService) { }

  setContacts() {
    this.http.get<Contact[]>(this.url).subscribe(contacts => {
      this.contacts = contacts;
      this.contactsChanged.next(this.contacts.slice());
    });
  }

  requestUpdate() {
    this.http.put(this.url, this.contacts).subscribe(responseData => {
      console.log(responseData);
    });
  }

  createContact(finalContact: Contact) {
    this.http.post(this.url, finalContact).subscribe(responseData => {
      console.log(responseData);
    });
  }

  requestDelete(index: number) {
    this.http.delete(this.url + '/' + index).subscribe(responseData => {
      console.log(responseData);
    });
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(index: number) {
    return this.contacts[index];
  }

  addContact(contact: Contact) {
    const finalContact = new Contact(this.contacts.length + 1, contact.name, contact.email, contact.phone);
    this.contacts.push(finalContact);
    this.contactsChanged.emit(this.contacts.slice());
    this.createContact(finalContact);
  }

  updateContactList(index: number, newContact: Contact) {
    this.contacts[index] = newContact;
    this.contactsChanged.next(this.contacts.slice());
  }

  deleteContact(index: number) {
    let newId: number = 1;
    this.contacts.splice(index, 1);
    this.requestDelete(index);
    this.contacts.forEach(function (value) {
      value.id = newId;
      newId++;
    });
    this.contactsChanged.next(this.contacts.slice());
    this.contactsListUpdated.emit(true);
  }

  addContactToview(index: number) {
    this.viewcontact = this.getContact(index);
    this.viewService.onContactToViewAdded(this.viewcontact);
  }
}
