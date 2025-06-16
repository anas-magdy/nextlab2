import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Try to connect to MongoDB
    let client;
    try {
      client = await clientPromise;
    } catch (connectionError) {
      console.error("Failed to connect to MongoDB:", connectionError);
      return NextResponse.json(
        { error: "Failed to connect to database." },
        { status: 500 }
      );
    }

    const db = client.db();

    // Check if the ID is a valid ObjectId
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (_error: unknown) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const user = await db.collection("users").findOne({ _id: objectId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// UPDATE user by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get the request body
    const body = await request.json();
    const { name, email, image, isAdmin, bio } = body;

    // Check for required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Check if the ID is a valid ObjectId
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (_error: unknown) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Find the user first to make sure it exists
    const existingUser = await db
      .collection("users")
      .findOne({ _id: objectId });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the email is already in use by another user
    if (email !== existingUser.email) {
      const emailExists = await db
        .collection("users")
        .findOne({ email, _id: { $ne: objectId } });

      if (emailExists) {
        return NextResponse.json(
          { error: "Email is already in use by another user" },
          { status: 409 }
        );
      }
    }

    // Update the user
    const updatedUser = {
      name,
      email,
      isAdmin: !!isAdmin,
      bio: bio || existingUser.bio || "",
      image: image || existingUser.image || "",
      updatedAt: new Date(),
    };

    await db
      .collection("users")
      .updateOne({ _id: objectId }, { $set: updatedUser });

    // Get the updated user
    const user = await db.collection("users").findOne({ _id: objectId });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE user by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Check if the ID is a valid ObjectId
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (_error: unknown) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Find the user first to make sure it exists
    const existingUser = await db
      .collection("users")
      .findOne({ _id: objectId });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete the user
    await db.collection("users").deleteOne({ _id: objectId });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
