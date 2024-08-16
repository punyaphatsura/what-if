import connectDB from '@/utils/libs/mongodb/connectDB';
import Answer from '@/utils/libs/mongodb/model/answer';

import * as XLSX from 'xlsx';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const path = request.nextUrl.searchParams.get('code');
    if (path !== process.env.GET_RESULT_PATH)
      return new NextResponse(JSON.stringify({ message: '404 Not Found' }), {
        status: 418,
        headers: { 'Content-Type': 'application/json' },
      });

    const answers = await Answer.find({}, { _id: 0, __v: 0 }).lean();

    const flattenedAnswers = answers.map((answer) => ({
      date: answer.date,
      results: answer.result.map((result: { page: string; choice: string }) => ({
        page: result.page,
        choice: result.choice,
      })),
    }));

    // Convert the flattened data to a format suitable for Excel
    const data = flattenedAnswers.flatMap((answer) =>
      answer.results.map((result: { page: string; choice: string }) => ({
        date: answer.date,
        page: result.page,
        choice: result.choice,
      }))
    );

    // Create a worksheet and a workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Answers');

    // Write the workbook to a buffer
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Create a response with the Excel file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="answers.xlsx"',
      },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({
        message: 'Failed to connect to Database or fetch data',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const answer = new Answer(body);
    await answer.save();

    const savedAnswer = answer.toObject();
    return new NextResponse(
      JSON.stringify({ message: 'Data saved successfully', data: savedAnswer }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ message: err }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
