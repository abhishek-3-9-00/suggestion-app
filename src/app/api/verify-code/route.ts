import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    //for removing Spaces
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({
      username: decodedUsername,
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found!!",
        },
        {
          status: 404,
        }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "Account Verified Successfully",
        },
        {
          status: 200,
        }
      );
    } else {
      if (!isCodeNotExpired) {
        return Response.json(
          {
            success: false,
            message: "Code has Expired, please signup again to get new code",
          },
          {
            status: 400,
          }
        );
      } else {
        return Response.json(
          {
            success: false,
            message: "Invalid Code.",
          },
          {
            status: 400,
          }
        );
      }
    }
  } catch (error) {
    console.error("Error Verifying User", error);
    return Response.json(
      {
        success: false,
        message: "Error Verifying User",
      },
      {
        status: 500,
      }
    );
  }
}
