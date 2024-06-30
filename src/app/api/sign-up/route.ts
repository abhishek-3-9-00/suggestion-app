import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        { status: 400 }
      );
    }
    const existingUserbyEmail = await UserModel.findOne({
      email,
    });
    const verifiedCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserbyEmail) {
      if (existingUserbyEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist with this email.",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserbyEmail.password = hashedPassword;
        existingUserbyEmail.verifyCode = verifiedCode;
        existingUserbyEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserbyEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode: verifiedCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
        uid: uuidv4(),
      });
      await newUser.save();
    }
    //send Verification Email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifiedCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
