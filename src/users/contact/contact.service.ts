import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {
  public getContacts() {
    return 'List of contacts';
  }

  public searchContact(keyword: string) {
    return `Search results for contact with keyword: ${keyword}`;
  }

  public addContact() {
    return 'Add contact logic';
  }

  public removeContact() {
    return 'Remove contact logic';
  }
}
