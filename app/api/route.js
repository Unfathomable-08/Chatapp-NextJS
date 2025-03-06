import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function GET(req) {
    try {
      // Get the Authorization header
      const authHeader = req.headers.get("authorization");
  
      // Check if the header exists
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      // Remove "Bearer " prefix
      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      return Response.json({ user: decoded }, { status: 200 });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
  