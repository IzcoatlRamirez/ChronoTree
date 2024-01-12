import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log(">>>> DB is connected")
    } catch (error) {
        console.log(error)
    }
}


export default prisma;