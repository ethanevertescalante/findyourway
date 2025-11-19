import prisma from "@/app/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;
    console.log(username);

    const userExists = await prisma.user.findFirst({
        where: { name: username },
    });

    console.log(userExists);

    if(userExists) {
        console.log("user already exists");
        return NextResponse.json({ exists: !!userExists, message: "User already exists, please choose another username" }, {status: 400});
    }

    console.log("user does not exist, ok to use");
    return NextResponse.json({exists: userExists, message: "Username is ok" }, {status: 200});
}

