import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET users
export async function GET() {
  try {
    // Try to connect to MongoDB
    let client;
    try {
      client = await clientPromise;
    } catch (connectionError) {
      console.error("Failed to connect to MongoDB:", connectionError);
      return NextResponse.json(
        {
          users: [],
          error: "Failed to connect to database.",
        },
        { status: 500 }
      );
    }

    const db = client.db();

    // Fetch users and limit the fields to reduce response size
    const users = await db
      .collection("users")
      .find({})
      .project({
        _id: 1,
        name: 1,
        email: 1,
        isAdmin: 1,
        createdAt: 1,
        image: 1,
      })
      .limit(50)
      .toArray();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      {
        users: [],
        error: "Failed to fetch users from database.",
      },
      { status: 500 }
    );
  }
}

// POST user
export async function POST(request: Request) {
  try {
    const { name, email, isAdmin, image, bio } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if user with this email already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const currentDate = new Date();

    // Insert new user
    const result = await db.collection("users").insertOne({
      name,
      email,
      isAdmin: !!isAdmin,
      bio: bio || "",
      image: image || "",
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    // Get the newly created user
    const newUser = await db
      .collection("users")
      .findOne({ _id: result.insertedId });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
