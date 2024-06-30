import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  //localhost:3000/api/check-username-unique?username=abhishek
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = { username: searchParams.get("username") };

    //validation wit zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameError = result.error.format()?.username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameError.length > 0
              ? usernameError.join(",")
              : "Invalid Query Parameter",
        },
        {
          status: 400,
        }
      );
    }
    const { username } = result?.data;
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: true,
          message: "Username is already taken",
        },
        {
          status: 200,
        }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "Username is unique",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error Checking Username Validation", error);
    return Response.json(
      {
        success: false,
        message: "Error Checking Username Validation",
      },
      {
        status: 500,
      }
    );
  }
}
