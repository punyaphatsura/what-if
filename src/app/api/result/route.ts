import connectDB from "@/utils/libs/mongodb/connectDB";
import Answer from "@/utils/libs/mongodb/model/answer";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const answers = await Answer.find({}, { _id: 0, __v: 0 });
    return new NextResponse(
      JSON.stringify({ message: "Data fetched successfully", data: answers }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({
        message: "Failed to connect to Database or fetch data",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const answer = new Answer(body);
    await answer.save();

    const savedAnswer = answer.toObject(); // Convert to plain object
    delete savedAnswer._id;
    return new NextResponse(
      JSON.stringify({ message: "Data saved successfully", data: savedAnswer }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to connect to Database or save data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
