import { connectDb } from "@/lib/db";

export async function POST(req) {
    try {
        const data = await req.json();
        const db = await connectDb();

        // Checking if name exists
        const  [rooms] = await db.query("SELECT * FROM rooms WHERE name = ?", [data.name]);

        if (rooms.length > 0){
            return Response.json({message: "Room with this already exist kindly try different name."}, {status: 400})
        };

        // Adding to database
        await db.query("INSERT INTO rooms (owner, name, description, password, members) VALUES (?, ?, ?, ?, ?)", [data.owner, data.name, data.description, data.password, JSON.stringify(data.members)]);

        return Response.json({message: "Room created succesfully", data}, {status: 200});

    } catch (error) {
        return Response.json({message: error.message}, {status: 500});
    }
}

export async function GET(req) {
  try {
    const db = await connectDb();

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    // If Link is wrong
    if (!username) {
      return Response.json({ message: "Username is required" }, { status: 400 });
    }

    // Fetch rooms where members JSON array contains the username
    const [rooms] = await db.query(
      "SELECT * FROM rooms WHERE JSON_CONTAINS(members, JSON_QUOTE(?))",
      [username]
    );

    return Response.json(rooms, { status: 200 });

  } catch (error) {
    console.error("Error fetching rooms:", error);
    return Response.json({ message: error.message }, { status: 500 }
    );
  }
}
