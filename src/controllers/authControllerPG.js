import { prisma } from "../config/pgdb.js";
import bcrypt from "bcryptjs";
import { generateToken } from '../utils/generateToken.js';
const register = async (req, res) => {
    let connection;

    try {
        const { name, email, password } = req.body;
        console.log ("in controller");
        const userExists = await prisma.user.findUnique({
            where: {email : email }
        });
        if (userExists) {
           return res
            .status(400)
            .json({message: `User with email ${email} exists in the database.`}); 
        } 

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        console.log("Inserting into the table");   
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPass
            }
        });  
        return res
            .status(201).json({
                status: "success",
                data: {
                    user: {
                        id: user.id,
                        name: name,
                        email: email
                    }
                }   
            });
    } catch (error) {
        console.error(`Error while checking user ${error.message}`)
        return res
            .status(500)
            .json({message: "Error while checking the user exists function"});
    };
};

const login = async (req, res) => {
    let connection;

    try {
        const { name, email, password } = req.body;
        console.log ("in controller");
        const user = await prisma.user.findUnique({
            where: {email: email }
        });

        if (! user) {
            return res
            .status(400)
            .json({message: `Invalid Username or password`}); 
        }  
        // verify password
        console.log ("before hashing");
        const isPasswordValid = await bcrypt.compare (password,user.password);

        if (!isPasswordValid){
           return res.status(401).json({
            error: "Invalid username or password"
           }); 
        }
        // Generate token
        const token = generateToken(user.id,res);
        
        return res.status(200).json({
            message: "Login successful",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token
            }
        });
        return res
            .status(201).json({
                status: "success",
                data: {
                    user: {
                        id: User.id,
                        email: email
                    }
                }   
            });

    } catch (error) {
        console.error(`Error while checking user ${error.message}`)
        return res
            .status(500)
            .json({message: "Error while checking the user exists function"});
    };    
}

const logout = async (req, res) => {
    res.cookie("jwt","",{
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        message: "Successfully logged out",
        status: "success"
    });
};

export  {register, login, logout};