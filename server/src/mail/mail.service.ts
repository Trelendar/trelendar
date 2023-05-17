import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, text: string, link: string) {
    const html = `
    <!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Invitation to Our Event</title>
    <style>
      /* Reset styles */
      body {
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5em;
        color: #333;
      }

      /* Responsive styles */
      @media only screen and (max-width: 600px) {
        .inner-body {
          width: 100% !important;
        }
        .footer {
          width: 100% !important;
        }
      }

      /* Email container */
      .email-wrapper {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
      }

      /* Email header */
      .header {
        padding: 20px;
        text-align: center;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
      }

      /* Email body */
      .body {
        padding: 20px;
        background-color: #fff;
      }

      /* Email footer */
      .footer {
        padding: 20px;
        text-align: center;
        background-color: #fff;
        border-top: 1px solid #ddd;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>

  <body>
  <div class="body">
  <p>Dear,</p>

  <p>We would like to invite you to our board. This will be a great opportunity to learn more about our board and network with other professionals in the industry.</p>


  <p>Please click the button below to accept the invitation:</p>

  <button style="background-color: #4CAF50; border: none; color: white; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
    <a href="${link}" style="color: white; text-decoration: none;">Accept Invitation</a>
  </button>

  <p>Best regards,</p>
  <p>The Trelendar Team</p>
</div>
  </body>
</html>
    `;

    await this.mailerService.sendMail({
      to,
      subject,
      html,
    });
  }
}
