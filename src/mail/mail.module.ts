import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from '../queue/email.processor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.registerQueue({
      name: 'email-queue',
    }),
  ],
  providers: [MailService, EmailProcessor],
  exports: [MailService],
})
export class MailModule {}
