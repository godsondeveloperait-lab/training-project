import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import { MailService } from '../mail/mail.service';

@Processor('email-queue')
export class EmailProcessor {

  constructor(private mailService: MailService) {}

  @Process('send-welcome-email')
  async handleWelcomeEmail(job: Job) {

    const { email } = job.data;

    await this.mailService.sendMail(
      email,
      'Welcome to our platform!'
    );

  }
}