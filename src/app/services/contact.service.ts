import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  allContacts: any;
  private getBaseUrl(): string {
    return `${environment.firebase}`;
  }
  constructor(private http: HttpClient) {}

  /**
   * create contacts
   * @param contactData
   */
  createContact(contactData: any) {
    if (this.allContacts?.length) {
      return this.http.put(`${this.getBaseUrl()}/contact.json`, [
        ...this.allContacts,
        contactData,
      ]);
    } else {
      return this.http.put(`${this.getBaseUrl()}/contact.json`, [contactData]);
    }
  }

  /**
   * gets contact list
   */
  getContactList() {
    return this.http.get(`${this.getBaseUrl()}/contact.json`);
  }
}
