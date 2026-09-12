import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient ({

    log: process.env.NODE_ENV=="development"
    ? [ "query","error","warn"]
    : ["error"]
});

const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log("DB connected via prisma")
    } catch (error) {
        console.error(`Prisma DB connection error: ${error.message}`);
        process.exit(1);
    }
}

const disconnectDB = async () => {
    try {
        await prisma.$disconnect()
        console.log("DB connected via prisma")
    } catch (error) {
        console.error(`Prisma DB disconnection error: ${error.message}`);    
    }

};
export {prisma,connectDB,disconnectDB};