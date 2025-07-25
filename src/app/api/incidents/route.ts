import { prisma } from '@/lib/prism'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {

    try {
        const { searchParams } = new URL(req.url);
        const resolvedParam = searchParams.get("resolved");
        const resolved = resolvedParam === 'true' ? true :
                     resolvedParam === 'false' ? false :
                     undefined;

        const incidents = await prisma.incident.findMany({
            where: resolved !== undefined ? { resolved } : undefined,
            orderBy: { tsStart: 'desc' },
            include: { camera: true },
        })

        return NextResponse.json(incidents);

    } catch (err) {
        return NextResponse.json({ err: err || 'Server Error', status: 'failed' }, { status: 500 });
    }
}
