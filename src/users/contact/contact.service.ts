import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLogger } from 'src/logger';
import type { User } from '../schemas/user.schema';
import type {
  AddContactRequest,
  Contact,
  RemoveContactRequest,
} from './contact.model';

@Injectable()
export class ContactService {
  private readonly log: UserLogger;

  constructor(@InjectModel('User') private userModel: Model<User>) {
    this.log = UserLogger.getLogger();
  }

  public async getContacts(username: string): Promise<Contact[]> {
    try {
      this.log.info(
        'ContactService',
        `Fetching contacts for user: ${username}`,
      );
      const user = await this.userModel.findOne({ username }).exec();
      if (!user) {
        this.log.error('ContactService', `User not found: ${username}`);
        throw new Error('User not found');
      }
      this.log.info(
        'ContactService',
        `${user.contacts.length} - Contacts fetched for ${username}`,
      );
      const usersList = await this.userModel
        .where('username')
        .in(user.contacts);
      return usersList.map(
        (u) =>
          ({
            username: u.username,
            firstName: u.firstName,
            lastName: u.lastName,
          }) as Contact,
      );
    } catch (error) {
      this.log.error('ContactService', `Error fetching contacts: ${error}`);
      throw error;
    }
  }

  public async searchContact(
    username: string,
    keyword: string,
  ): Promise<Contact[]> {
    try {
      const regex = new RegExp(keyword, 'i');
      this.log.info(
        'ContactService',
        `Searching contacts for user: ${username} with keyword: ${keyword}`,
      );
      const contacts = await this.userModel.find({
        $or: [
          { username: { $regex: regex } },
          { firstName: { $regex: regex } },
          { lastName: { $regex: regex } },
        ],
      });
      this.log.info(
        'ContactService',
        `${contacts.length} - Contacts found for ${username} with keyword: ${keyword}`,
      );
      return contacts.map(
        (u) =>
          ({
            username: u.username,
            firstName: u.firstName,
            lastName: u.lastName,
          }) as Contact,
      );
    } catch (error) {
      this.log.error('ContactService', `Error searching contacts: ${error}`);
      throw error;
    }
  }

  public async addContact(username: string, request: AddContactRequest) {
    try {
      this.log.info(
        'ContactService',
        `Adding contact ${request.username} for user: ${username}`,
      );
      const isReceiverExists = await this.userModel.exists({
        username: request.username,
      });
      if (!isReceiverExists) {
        this.log.error(
          'ContactService',
          `Contact user not found: ${request.username}`,
        );
        throw new Error('Contact user not found');
      }
      const user = await this.userModel.findOne({ username }).exec();
      if (!user) {
        this.log.error('ContactService', `User not found: ${username}`);
        throw new Error('User not found');
      }
      if (user.contacts.includes(request.username)) {
        this.log.warn(
          'ContactService',
          `Contact ${request.username} already exists for user: ${username}`,
        );
        return 'Contact already exists';
      }
      user.contacts.push(request.username);
      await user.save();
      this.log.info(
        'ContactService',
        `Contact ${request.username} added successfully for user: ${username}`,
      );
      return 'Contact added successfully';
    } catch (error) {
      throw new HttpException(`Error adding contact: ${error}`, 500);
    }
  }

  public async removeContact(username: string, request: RemoveContactRequest) {
    try {
      this.log.info(
        'ContactService',
        `Removing contact ${request.username} for user: ${username}`,
      );
      const user = await this.userModel.findOne({ username }).exec();
      if (!user) {
        this.log.error('ContactService', `User not found: ${username}`);
        throw new Error('User not found');
      }
      const contactIndex = user.contacts.indexOf(request.username);
      if (contactIndex === -1) {
        this.log.warn(
          'ContactService',
          `Contact ${request.username} does not exist for user: ${username}`,
        );
        return 'Contact does not exist';
      }
      user.contacts.splice(contactIndex, 1);
      await user.save();
      this.log.info(
        'ContactService',
        `Contact ${request.username} removed successfully for user: ${username}`,
      );
      return 'Contact removed successfully';
    } catch (error) {
      throw new HttpException(`Error removing contact: ${error}`, 500);
    }
  }
}
