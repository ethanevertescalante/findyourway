import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
    try {
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { lat, lng, location, review, cost } = body;

        if (
            typeof lat !== "number" ||
            typeof lng !== "number" ||
            typeof location !== "string" ||
            typeof review !== "string" ||
            typeof cost !== "string"
        ) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const userId = session.user.id;

        const pin = await prisma.pin.create({
            data: {
                lat,
                lng,
                location,
                review,
                cost,
                userId,
            },
        });

        return NextResponse.json(pin, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = session.user.id;

        const pins = await prisma.pin.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(pins, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

interface Params {
    params: { id: string };
}

export async function PATCH(request: Request, { params }: Params) {
    try {
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const userId = session.user.id;
        const pinId = params.id;

        const body = await request.json();
        const { lat, lng } = body;

        if (typeof lat !== "number" || typeof lng !== "number") {
            return NextResponse.json(
                { error: "lat and lng must be numbers" },
                { status: 400 },
            );
        }

        const existing = await prisma.pin.findUnique({
            where: { id: pinId },
            select: { userId: true },
        });

        if (!existing || existing.userId !== userId) {
            return NextResponse.json(
                { error: "Not found" },
                { status: 404 },
            );
        }

        const updated = await prisma.pin.update({
            where: { id: pinId },
            data: { lat, lng },
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 },
        );
    }
}
