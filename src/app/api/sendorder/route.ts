import nodemailer from 'nodemailer';
import connectDB from '@/lib/mongoose';
import Checkout from '@/models/Checkout';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // form data milega yahan

        await connectDB();
        const newOrder = new Checkout(body);
        await newOrder.save();

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
    } catch (err) {
        console.error("❌ Error saving order:", err);
        return NextResponse.json({ success: false, message: "Failed to save order" }, { status: 500 });
    }
    const body = await req.json(); // form data milega yahan



    return NextResponse.json({ success: true });
}