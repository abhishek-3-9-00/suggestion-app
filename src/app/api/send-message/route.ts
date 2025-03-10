import { Message } from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, content, uid } = await request.json();
    const user = await UserModel.findOne({ username, uid });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        {
          status: 401,
        }
      );
    }
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User Not Accepting Messages",
        },
        {
          status: 403,
        }
      );
    }
    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message Send Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in sending message.", error);
    return Response.json(
      {
        success: false,
        message: "Error in sending message.",
      },
      {
        status: 500,
      }
    );
  }
}
