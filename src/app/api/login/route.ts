import { getDBConnection } from "@/app/database/connection"
import { User } from "@/app/models/User"
import { NextResponse } from "next/server"

export const GET = async () =>{
    const connection = await getDBConnection()
    try {
        return NextResponse.json( connection.getRepository(User).find())
    } catch (error) {
        return NextResponse.json({"auth":"false", "message":"falha"})
    }
}