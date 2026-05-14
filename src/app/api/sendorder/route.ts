import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json(); // form data milega yahan

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: body.email, 
    subject: `New Order from ${body.name}`,
    html: `
      <h2>New Order Received</h2>
      <p><b>Name:</b> ${body.name}</p>
      <p><b>Email:</b> ${body.email}</p>
      <p><b>Phone:</b> ${body.phone}</p>
      <p><b>Address:</b> ${body.address}, ${body.city} ${body.zip}</p>
      <p><b>Payment:</b> ${body.paymentMethod}</p>
    `,
  });

  return NextResponse.json({ success: true });
}