import { Controller, Get, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('users/contacts')
export class ContactController {
  private contactService: ContactService;

  constructor(contactService: ContactService) {
    this.contactService = contactService;
  }

  @Get('/')
  public getContacts() {
    return this.contactService.getContacts();
  }

  @Get('/search/:keyword')
  public searchConntact(@Param('keyword') keyword: string) {
    return this.contactService.searchContact(keyword);
  }

  @Post('/add')
  public addContact() {
    return this.contactService.addContact();
  }

  @Post('/remove')
  public removeContact() {
    return this.contactService.removeContact();
  }
}
