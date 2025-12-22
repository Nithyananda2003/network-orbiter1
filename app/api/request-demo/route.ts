import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'sales@networkorbiter.com',
      subject: 'Demo Request from Network Orbiter Website',
      html: `
        <p><b>First Name:</b> ${formData.firstName}</p>
        <p><b>Last Name:</b> ${formData.lastName}</p>
        <p><b>Organization:</b> ${formData.organization}</p>
        <p><b>Phone:</b> ${formData.phone}</p>
        <p><b>Email:</b> ${formData.email}</p>
        <p><b>Country:</b> ${formData.country}</p>
        <p><b>Existing Customer:</b> ${formData.existingCustomer}</p>
        <p><b>Application:</b> ${formData.application}</p>
        <p><b>How Heard:</b> ${formData.howHeard}</p>
        <p><b>Questions/Comments:</b> ${formData.questions}</p>
        <p><b>Consent to Data Collection:</b> ${formData.consent ? 'Yes' : 'No'}</p>
        <p><b>Newsletter Subscription:</b> ${formData.newsletter ? 'Yes' : 'No'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
