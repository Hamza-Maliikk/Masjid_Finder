import connectDB from "@/lib/mongoose";
import Masjid from "@/models/Masjid";
import { NextResponse } from "next/server";

export async function GET(){
        await connectDB()
        const masjids = await Masjid.find({})
        return NextResponse.json({success: true, data: masjids})
}