import connectDB from "@/lib/mongoose"
import Dua from "@/models/Dua"
import { NextResponse } from "next/server"
import redis from "@/lib/redis"

export async function GET() {
  try {
    const cached = await redis.get("duas")

    if (cached) {
      console.log("⚡ Come from reddis")
      return NextResponse.json({
        success: true,
        data: JSON.parse(cached),
        source: "redis"       
      })
    }

    await connectDB()
    const duas = await Dua.find({})
    const data = JSON.parse(JSON.stringify(duas))

    await redis.set("duas", JSON.stringify(data), "EX", 360)
    console.log("Data from ATLAS — Save in reddis")

    return NextResponse.json({
      success: true,
      data,
      source: "database"  
    })

  } catch (err) {
    console.error("❌ Error:", err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}