import connectDB from "@/lib/mongoose";

export async function GET(){
        await connectDB()
        return Response.json({message: 'Database connected'})
}