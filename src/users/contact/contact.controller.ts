import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import type { AddContactRequest, RemoveContactRequest } from './contact.model';
import { ContactService } from './contact.service';

@Controller('users/contacts')
export class ContactController {
  private contactService: ContactService;

  constructor(contactService: ContactService) {
    this.contactService = contactService;
  }

  @Get('/')
  public async getContacts(@Headers('username') username: string) {
    return await this.contactService.getContacts(username);
  }

  @Get('/search/:keyword')
  public searchConntact(
    @Headers('username') username: string,
    @Param('keyword') keyword: string,
  ) {
    return this.contactService.searchContact(username, keyword);
  }

  @Post('/add')
  public async addContact(
    @Headers('username') username: string,
    @Body() request: AddContactRequest,
  ) {
    return await this.contactService.addContact(username, request);
  }

  @Post('/remove')
  public async removeContact(
    @Headers('username') username: string,
    @Body() request: RemoveContactRequest,
  ) {
    return await this.contactService.removeContact(username, request);
  }
}
