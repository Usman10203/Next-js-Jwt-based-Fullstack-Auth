import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function PUT(request: NextRequest) {
    try {

        const reqBody = await request.json()

        const { id, password } = reqBody;
        console.log(reqBody);
        // const userId = await getDataFromToken(request);

        const user = await User.findOne({ _id: id })
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        console.log("user", user);

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        user.password = hashedPassword
        await user.save();

        console.log('New password', user)

        return NextResponse.json({
            message: "Password updated successfully",
            success: true,
        })




    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}