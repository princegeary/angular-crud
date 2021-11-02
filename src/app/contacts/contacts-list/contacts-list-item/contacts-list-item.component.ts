import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../contact.model';
import { ContactService } from '../../contact.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacts-list-item',
  templateUrl: './contacts-list-item.component.html',
  styleUrls: ['./contacts-list-item.component.css']
})
export class ContactsListItemComponent implements OnInit {
  @Input() contact: Contact;
  @Input() index: number;
  // @Output() selectedContact = new EventEmitter<void>();

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void { }

  onContactView(index: number) {
    this.contactService.addContactToview(index);
    console.log("1st " + index);
  }

  onContactUpdate(index: number) {
    this.contactService.startUpdating.next(index);
    this.contactService.requestUpdate();
  }

  onContactDelete(index: number) {
    this.contactService.deleteContact(index);
  }
}
