import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  contactId: number;
  contact: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}
  ngOnInit(): void {
    //geting id from params
    this.activatedRoute.params.subscribe((param) => {
      this.contactId = param['id'];
      this.contactService.getContactList().subscribe((res) => {
        //finding contact with id
        this.contact = res[this.contactId];
      });
    });
  }

  /**
   * handles send message button click
   * @param contactId
   */
  onSendMessageClick(contactId: number) {
    this.router.navigate([`send-message/${contactId}`]);
  }
}
