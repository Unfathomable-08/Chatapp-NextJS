import { connectDb } from "@/lib/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function POST(req){
    try {
        const db = await connectDb();

        const data = await req.json();

        // Hash password before storing
        const hashed = await bcrypt.hash(data.password, 12); 

        // Insert user into the database
        await db.query("INSERT INTO users (first_name, last_name, email, password, username) VALUES (?, ?, ?, ?, ?)", [data.first_name, data.last_name, data.email, hashed, data.username]);

        // Fetch the user data to return it in the response
        const [user] = await db.query("SELECT * FROM users WHERE email = ?", [data.email]);

        // Generate token
        const token = jwt.sign(
            {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                username: data.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        
        return Response.json({message: "Signup Succesful", data: user, token: token}, {status: 201});
    }
    catch (error){
        return Response.json({error: error.message}, {status: 500});
    }
}