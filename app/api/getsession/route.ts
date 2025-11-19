import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

export async function GET(request: Request) {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
        return NextResponse.json(
            { error: "no session available" },
            { status: 401 },
        );
    }




    const username = session.user.name ?? " ";
    const email = session.user.email ?? " ";
    const image = session.user.image ?? " ";
    const travellerSince = `${session.user.createdAt.getMonth() + 1}/${session.user.createdAt.getDate()}/${session.user.createdAt.getFullYear()}` ;
    console.log(travellerSince);

    return NextResponse.json({
        username,
        email,
        image,
        travellerSince
    }, { status: 200 });
}
