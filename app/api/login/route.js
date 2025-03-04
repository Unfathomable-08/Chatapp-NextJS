import { connectDb } from "@/lib/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function POST(req) {
    try {
        const db = await connectDb();

        const data = await req.json();

        // Getting data from database
        const [user] = await db.query("SELECT * FROM users WHERE email = ? OR username = ?", [data.email, data.email]);

        if (!user[0]) {
            return Response.json({ error: "Incorrect Email or Username" }, {status: 404});
        }

        // Checking is password correct
        const isMatched = await bcrypt.compare(data.password, user[0]?.password || null);

        if (!isMatched) {
            return Response.json({ error: "Incorrect Password" }, {status: 400});
        }

        // Generate token
        const token = jwt.sign(
            {
                first_name: user[0].first_name,
                last_name: user[0].last_name,
                email: user[0].email,
                username: user[0].username
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return Response.json({message: "Login Succesful", data: user[0], token: token}, {status: 200});

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}