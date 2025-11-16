import prisma from "@/app/lib/prisma";

export async function GET(
    _req: Request,
    { params }: { params: { name: string } }
) {
    const { name } = params;

    const userExists = await prisma.user.findFirst({
        where: { name },
    });

    return Response.json({ exists: !!userExists });
}

