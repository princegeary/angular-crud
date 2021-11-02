import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) contactForm: NgForm;

  subscription: Subscription;
  updateMode = false;
  updatedItemIndex: number;
  updatedItem: Contact;

  contact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.subscription = this.contactService.startUpdating.subscribe(
      (index: number) => {
        this.updatedItemIndex = index;
        this.updateMode = true;
        this.updatedItem = this.contactService.getContact(index);
        this.contactForm.setValue({
          name: this.updatedItem.name,
          email: this.updatedItem.email,
          phone: this.updatedItem.phone
        })
      }
    );
    this.subscription = this.contactService.contactsListUpdated.subscribe(
      (updated: boolean) => {
        if (updated) {
          this.contactForm.reset();
          this.updateMode = false;
        }
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    if (this.updateMode) {
      let newContact = new Contact(this.updatedItem.id, value.name, value.email, value.phone);
      this.contactService.updateContactList(this.updatedItemIndex, newContact)
    } else {
      const value = form.value;
      let newContact = new Contact(1, value.name, value.email, value.phone);
      this.contactService.addContact(newContact);
    }
    this.updateMode = false;
    form.reset();
  }

  onClear() {
    this.contactForm.reset();
    this.updateMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
