import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(to: string, message: string, attachments?: any[]) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to: to,
      subject: 'Buy Product Reminder',
      text: message,
      attachments: attachments,
    });
  }
}
