import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      stream: true,
      max_tokens: 400,
      prompt,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        {
          name,
          status,
          headers,
          message,
        },
        { status }
      );
    } else {
      console.error("An unexpected error occured", error);
      throw error;
    }
  }
}
