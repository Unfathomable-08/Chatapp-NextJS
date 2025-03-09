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

export async function PATCH(req) {
    try {
        const data = await req.json();
        const db = await connectDb();

        // Check if the room exists
        const [rooms] = await db.query("SELECT * FROM rooms WHERE name = ?", [data.name]);
        
        if (rooms.length === 0) {
            return Response.json({ message: "Room not found." }, { status: 404 });
        }

        const room = rooms[0];

        // Check if the password matches
        if (room.password !== data.password) {
            return Response.json({ message: "Incorrect password." }, { status: 403 });
        }

        let members;
        try {
            members = JSON.parse(room.members);
            if (!Array.isArray(members)) {
                members = [room.members]; // Convert single string to an array
            }
        } catch {
            members = room.members ? [room.members] : []; // Handle non-JSON cases
        }

        // Check if user is already a member
        if (members.includes(data.username)) {
            return Response.json({ message: "User is already in the room." }, { status: 400 });
        }

        // Add the new member
        members.push(data.username);
        await db.query("UPDATE rooms SET members = ? WHERE name = ?", [JSON.stringify(members), data.name]);

        return Response.json({ message: "User added to the room successfully." }, { status: 200 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}