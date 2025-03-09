import { connectDb } from "@/lib/db";

export async function GET(req) {
    try {
        const db = await connectDb();

        // Get query parameters
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search");

        // If Link is wrong
        if (!search) {
            return Response.json({ message: "Search value is not sent to backend" }, { status: 400 });
        }

        // Fetch Room
        const [rooms] = await db.query("SELECT * FROM rooms WHERE name = ?", [search]);

        if (rooms.length === 0){
            return Response.json({message: "Room with this name doesn't exist!"}, {status: 404})
        };

        return Response.json({message: "Room exists"}, {status: 200});

    } catch (error) {
        return Response.json({message: error.message}, {status: 500});
    }
}