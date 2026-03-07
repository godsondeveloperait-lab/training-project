import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class CronService {

  constructor(
    private usersService: UsersService,
    private mailService: MailService
  ) {}

//   @Cron('0 0 22 * * *')
@Cron('0 */1 * * * *') 
  async handleCron() {

    console.log('Running nightly email job');

    const users = await this.usersService.getUsersByRole('user');

    for (const user of users) {

      await this.mailService.sendMail(
        user.email,
        'Hello! Don’t forget to check our products and buy something today.'
      );

    }

  }
}