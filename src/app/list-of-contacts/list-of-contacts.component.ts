import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-list-of-contacts',
  templateUrl: './list-of-contacts.component.html',
  styleUrls: ['./list-of-contacts.component.scss'],
})
export class ListOfContactsComponent implements OnInit {
  userForm: FormGroup;
  imageLink: string = null;
  contactList: any;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactService.getContactList().subscribe((res) => {
      this.contactService.allContacts = res;
      this.contactList = res;
    });
    this.formInit();
  }

  /**
   * initializes form
   */
  formInit() {
    this.userForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      date: [null],
    });
  }

  /**
   * creates contact
   */
  createContact() {
    if (this.userForm.valid) {
      this.contactService
        .createContact(this.userForm.value)
        .subscribe((res) => {
          this.contactService.allContacts = res;
          this.contactList = res;
        });
    }
  }

  onDetailClick(contactId: number) {
    this.router.navigate([`contact-details/${contactId}`]);
  }
}
