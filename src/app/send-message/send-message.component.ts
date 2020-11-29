import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {
  contact: any;
  otp: number;
  messageForm: FormGroup;
  otpForm: FormGroup;

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.activatedRoute.params.subscribe((param) => {
      this.getContactInfo(param['id']);
    });
  }

  /**
   * finds contact from array of contacts using contact id
   * @param contactId id of the contact ot be found
   */
  getContactInfo(contactId: number) {
    this.contactService.getContactList().subscribe((res) => {
      this.contact = res[contactId];
    });
  }

  /**
   * sends message to the user
   */
  sendMessage() {
    const payLoad = {
      number: `${this.contact?.phone}`,
      message: `Your OTP is ${this.otp} \n ${
        this.messageForm.get('message').value
      }`,
    };
    this.messageService.sendMessage(payLoad).subscribe((res) => {
      console.log(res);
    });
  }

  /**
   * initialize form
   */
  formInit() {
    this.messageForm = this.fb.group({
      message: [null, Validators.required],
    });

    this.otpForm = this.fb.group({
      phoneNumber: [null, Validators.required],
      otp: [null],
    });
  }

  /**
   * generates a random 6 digit otp
   */
  generateOTP() {
    this.otp = Math.floor(100000 + Math.random() * 900000);
  }

  /**
   * sends otp on provided number
   */
  verifyPhoneNumber() {
    if (this.otpForm.get('phoneNumber')?.value) {
      this.messageService
        .verifyNumberWithOtp(this.otpForm.get('phoneNumber')?.value)
        .subscribe((res) => {
          alert(`OTP sended on ${this.otpForm.get('phoneNumber')?.value}`);
        });
    }
  }

  /**
   * verifies one time password
   */
  verifyOneTimePassword() {
    if (this.otpForm.get('otp').value) {
      this.messageService
        .verifyOTP(
          this.otpForm.get('otp').value,
          this.otpForm.get('phoneNumber')?.value
        )
        .subscribe((res) => {
          console.log(res);
          alert('Number Succesfully Verified');
        });
    }
  }

  /**
   * paid plan needed to use this api cant verify a number by
   * api in trial account
   */
  // createNewCallerId() {
  //   this.messageService
  //     .setNewCallerId('saurav', '8376877316')
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }
}
