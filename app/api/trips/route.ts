import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
    try {
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { tripName, pinIds } = body as {
            tripName?: string;
            pinIds?: string[];
        };

        if (typeof tripName !== "string" || !tripName.trim()) {
            return NextResponse.json(
                { error: "tripName must be a non-empty string" },
                { status: 400 }
            );
        }

        const userId = session.user.id;
        const trimmedName = tripName.trim();

        let pinsToConnect: { id: string }[] = [];

        if (Array.isArray(pinIds) && pinIds.length > 0) {
            // Only allow pins that belong to this user
            const userPins: { id: string }[] = await prisma.pin.findMany({
                where: {
                    id: { in: pinIds },
                    userId,
                },
                select: { id: true },
            });

            if (userPins.length !== pinIds.length) {
                return NextResponse.json(
                    { error: "Some pins do not exist or do not belong to the user" },
                    { status: 400 }
                );
            }

            pinsToConnect = userPins.map((p) => ({ id: p.id }));
        }

        const trip = await prisma.trip.create({
            data: {
                tripName: trimmedName,
                userId,
                ...(pinsToConnect.length > 0 && {
                    Pins: { connect: pinsToConnect },
                }),
            },
            include: {
                Pins: true,
            },
        });

        return NextResponse.json(trip, { status: 201 });
    } catch (err) {
        console.error("POST /api/trip error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}


export async function GET(request: Request) {
    try {
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        const trips = await prisma.trip.findMany({
            where: { userId },
            include: { Pins: true },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(trips, { status: 200 });
    } catch (err) {
        console.error("GET /api/trip error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const body = await request.json();

        const { id, tripName, pinIds } = body as {
            id?: string;
            tripName?: string;
            pinIds?: string[];
        };

        // id is required to know which trip to update
        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }

        // must have at least one field to update
        if (tripName === undefined && pinIds === undefined) {
            return NextResponse.json(
                { error: "No fields to update" },
                { status: 400 }
            );
        }

        // validate tripName if provided
        if (tripName !== undefined && typeof tripName !== "string") {
            return NextResponse.json(
                { error: "tripName must be a string" },
                { status: 400 }
            );
        }

        // validate pinIds if provided
        if (pinIds !== undefined && !Array.isArray(pinIds)) {
            return NextResponse.json(
                { error: "pinIds must be an array" },
                { status: 400 }
            );
        }

        // ensure trip belongs to this user
        const existing = await prisma.trip.findUnique({
            where: { id },
            select: { userId: true },
        });

        if (!existing || existing.userId !== userId) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        const trimmedName = tripName?.trim();
        if (trimmedName === "") {
            return NextResponse.json(
                { error: "tripName cannot be empty" },
                { status: 400 }
            );
        }

        // validate / prepare pins if pinIds is provided
        let pinsToSet: { id: string }[] | undefined = undefined;

        if (Array.isArray(pinIds)) {
            if (pinIds.length > 0) {
                const userPins = await prisma.pin.findMany({
                    where: {
                        id: { in: pinIds },
                        userId,
                    },
                    select: { id: true },
                });

                if (userPins.length !== pinIds.length) {
                    return NextResponse.json(
                        { error: "Some pins do not exist or do not belong to the user" },
                        { status: 400 }
                    );
                }

                pinsToSet = userPins.map((p) => ({ id: p.id }));
            } else {
                // explicitly clear pins if an empty array was passed
                pinsToSet = [];
            }
        }

        // Build update data dynamically
        const data: any = {};

        if (trimmedName) {
            data.tripName = trimmedName;
        }

        if (pinsToSet !== undefined) {
            // REPLACE all pins for this trip with exactly these
            data.Pins = {
                set: pinsToSet,
            };
        }

        const updated = await prisma.trip.update({
            where: { id },
            data,
            include: { Pins: true },
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (err) {
        console.error("PATCH /api/trip error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}



export async function DELETE(request: Request) {
    try {
        const session = await auth.api.getSession({ headers: request.headers });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const { id } = (await request.json()) as { id?: string };

        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }

        const existing = await prisma.trip.findUnique({
            where: { id },
            select: { userId: true },
        });

        if (!existing || existing.userId !== userId) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        await prisma.trip.delete({
            where: { id },
        });

        // Depending on onDelete behavior, pins might be deleted or have tripId set to null

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("DELETE /api/trip error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
