import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendAdminEmail(name: string, email: string) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New User Registered',
      text: `A new user has registered.\nName: ${name}\nEmail: ${email}`,
    });
    console.log(`Email sent to admin for user: ${email}`);
  }
}
