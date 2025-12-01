import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import getPinLocation from "@/app/CustomUI/Pins/getPinLocation";

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
        console.log("pins: ",pins)
        return NextResponse.json(pins, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = session.user.id;

        const body = await request.json();
        const { id, lat, lng, review, cost } = body as {
            id?: string;
            lat?: number;
            lng?: number;
            review?: string;
            cost?: string;
        };

        if (!id) {
            return NextResponse.json(
                { error: "id is required" },
                { status: 400 }
            );
        }

        // Make sure at least one field was provided
        if (
            lat === undefined &&
            lng === undefined &&
            review === undefined &&
            cost === undefined
        ) {
            return NextResponse.json(
                { error: "No fields to update" },
                { status: 400 }
            );
        }

        // Validate numbers if provided
        if (lat !== undefined && typeof lat !== "number") {
            return NextResponse.json(
                { error: "lat must be a number" },
                { status: 400 }
            );
        }

        if (lng !== undefined && typeof lng !== "number") {
            return NextResponse.json(
                { error: "lng must be a number" },
                { status: 400 }
            );
        }

        // Optional: lat+lng must move together
        if (
            (lat !== undefined && lng === undefined) ||
            (lat === undefined && lng !== undefined)
        ) {
            return NextResponse.json(
                { error: "lat and lng must be updated together" },
                { status: 400 }
            );
        }

        // Validate strings if provided
        if (review !== undefined && typeof review !== "string") {
            return NextResponse.json(
                { error: "review must be a string" },
                { status: 400 }
            );
        }

        if (cost !== undefined && typeof cost !== "string") {
            return NextResponse.json(
                { error: "cost must be a string" },
                { status: 400 }
            );
        }

        const existing = await prisma.pin.findUnique({
            where: { id },
            select: { userId: true },
        });

        if (!existing || existing.userId !== userId) {
            return NextResponse.json(
                { error: "Not found" },
                { status: 404 }
            );
        }

        // Compute new location from lat/lng if provided
        let newLocation: string | null = null;
        if (typeof lat === "number" && typeof lng === "number") {
            newLocation = await getPinLocation(lat, lng);
            console.log("newLocation:", newLocation);
        }

        const updated = await prisma.pin.update({
            where: { id },
            data: {
                ...(lat !== undefined && { lat }),
                ...(lng !== undefined && { lng }),
                ...(review !== undefined && { review }),
                ...(cost !== undefined && { cost }),
                ...(newLocation !== null && { location: newLocation }),
            },
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "id is required" },
                { status: 400 }
            );
        }

        const existing = await prisma.pin.findUnique({
            where: { id },
            select: { userId: true },
        });

        if (!existing || existing.userId !== session.user.id) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        await prisma.pin.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
