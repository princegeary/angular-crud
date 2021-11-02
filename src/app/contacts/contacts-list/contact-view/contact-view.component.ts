import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../../contact.model';
import { ContactService } from '../../contact.service';
import { ContactViewService } from 'src/app/shared/contact-view.service';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {
  contact: Contact = new Contact(1, "Juan Dela Cruz", "juan.dela.cruz@accenture.com", "1234567890");
  contactChanged: Subscription;

  constructor(private viewService: ContactViewService, private router: Router) { }

  ngOnInit(): void {
    this.contactChanged = this.viewService.contactChanged.subscribe((contact: Contact) => {
      this.contact = contact;
      console.log(this.contact);
    });
  }
}
