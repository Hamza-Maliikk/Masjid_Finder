import connectDB from "@/lib/mongoose"
import Surah from "@/models/Surah"
import { NextResponse } from "next/server"
// import redis from "@/lib/redis"

export async function GET() {
  try {
    // const cached = await redis.get("surahs")

    // if (cached) {
    //   console.log("⚡ Come from reddis")
    //   return NextResponse.json({
    //     success: true,
    //     data: JSON.parse(cached),
    //     source: "redis"       
    //   })
    // }

    await connectDB()
    const surahs = await Surah.find({})
    const data = JSON.parse(JSON.stringify(surahs))

    // await redis.set("surahs", JSON.stringify(data), "EX", 360)
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