import dotenv from 'dotenv'
dotenv.config()

import nodemailer from 'nodemailer'

// Configure Nodemailer
export const mailTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.SMTP_PASSWORD}`
  }
});