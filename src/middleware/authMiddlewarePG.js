import jwt from "jsonwebtoken";
//import oracledb from "oracledb";
import { prisma } from "../config/pgdb.js";

export const authMiddleware = async (req, res, next) => {

    console.log("Auth middleware reached");

    let token;
    let connection;

    // Get token from Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];

    // Get token from cookie
    } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({
            error: "Not authorized; no token provided"
        });
    }

    try {

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded JWT:", decoded);

        // Get user ID from JWT
        const userId = decoded.id;
        console.log(`user id ${userId}`);

        if (!userId) {
            return res.status(401).json({
                error: "Not authorized; invalid token"
            });
        }

        // Connect to database
        const user = await prisma.user.findUnique({
           where: {id: userId }
        });

        if (! user) {
            return res.status(401).json({error: "Error - user doesn;t exist"});
        }
       
        req.user = user;
        // Continue to controller
        next();

    } catch (error) {

        console.error("Authentication error:", error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                error: "Not authorized; invalid token"
            });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                error: "Not authorized; token expired"
            });
        }

        return res.status(500).json({
            error: "Authentication failed",
            details: error.message
        });

    } finally {

    }
};