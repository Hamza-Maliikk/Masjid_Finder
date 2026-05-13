import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URI as string)

redis.on("connect", () => console.log("✅ Redis Connected!"))
redis.on("error", (err) => console.error("❌ Redis Error:", err))

export default redis