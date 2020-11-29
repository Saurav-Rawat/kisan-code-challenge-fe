import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  listOfAllMessages: any;
  getBaseUrl() {
    return `${environment.url}`;
  }
  sendersNumber: string = '+19109330107';
  constructor(private http: HttpClient) {}

  /**
   * sends message on certified contact
   * @param contactInfo
   */
  sendMessage(contactInfo: any) {
    return this.http.post(`${this.getBaseUrl()}/sendSms`, contactInfo);
  }

  /**
   * gets all sent messages from server
   */
  getAllMessage() {
    return this.http.get(`${this.getBaseUrl()}/getSms`);
  }

  /**
   * sends otp on provied number
   * @param phoneNumber
   */
  verifyNumberWithOtp(phoneNumber: string) {
    return this.http.put(`${this.getBaseUrl()}/create-number`, {
      number: phoneNumber,
    });
  }

  /**
   * verifies otp on backend
   * @param oneTimePassword
   * @param phoneNumber
   */
  verifyOTP(oneTimePassword: number, phoneNumber: string) {
    return this.http.post(`${this.getBaseUrl()}/verify`, {
      otp: oneTimePassword,
      number: phoneNumber,
    });
  }

  /**
   *  creates new verified caller if on twilio
   * (paid plan of twilio needed to use this api)
   * @param friendlyName
   * @param phoneNumber
   */
  setNewCallerId(friendlyName: string, phoneNumber: string) {
    return this.http.post(`${this.getBaseUrl()}/add-new-id`, {
      name: friendlyName,
      number: phoneNumber,
    });
  }
}
