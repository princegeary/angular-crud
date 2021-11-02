import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model'
import { ContactService } from '../contact.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[];
  i: number;
  url = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient, private contactService: ContactService) { }
  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactsChanged.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }
}
