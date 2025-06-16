import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    isAdmin: true,
    bio: "Software engineer and tech enthusiast.",
    image: "https://i.pravatar.cc/150?img=1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    isAdmin: false,
    bio: "UX designer with a passion for creating beautiful interfaces.",
    image: "https://i.pravatar.cc/150?img=5",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Mohamed Ahmed",
    email: "mohamed@example.com",
    isAdmin: false,
    bio: "Full-stack developer specializing in React and Node.js.",
    image: "https://i.pravatar.cc/150?img=3",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    isAdmin: false,
    bio: "Product manager with 5 years of experience in tech startups.",
    image: "https://i.pravatar.cc/150?img=8",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Khaled Omar",
    email: "khaled@example.com",
    isAdmin: true,
    bio: "DevOps engineer specializing in cloud infrastructure.",
    image: "https://i.pravatar.cc/150?img=11",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET() {
  try {
    let client;
    try {
      client = await clientPromise;
    } catch (connectionError) {
      console.error("Failed to connect to MongoDB:", connectionError);
      return NextResponse.json(
        {
          success: false,
          error:
            "Failed to connect to MongoDB database. Check server logs for details.",
        },
        { status: 500 }
      );
    }

    const db = client.db();

    // Delete all existing users
    try {
      await db.collection("users").deleteMany({});
      console.log("All users deleted successfully");
    } catch (deleteError) {
      console.error("Failed to delete existing users:", deleteError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to clear existing users.",
        },
        { status: 500 }
      );
    }

    // Insert sample users
    await db.collection("users").insertMany(sampleUsers);

    return NextResponse.json(
      {
        success: true,
        message: "Database reset and seeded successfully!",
        count: sampleUsers.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed database. Check server logs for details.",
      },
      { status: 500 }
    );
  }
}
