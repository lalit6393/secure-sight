import { prisma } from '@/lib/prism'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {
        const { id } = await params;
        const updated = await prisma.incident.update({
            where: { id },
            data: {
                resolved: true
            },
        })

        return NextResponse.json(updated)

    } catch (err) {
        return NextResponse.json({ err: err || 'Server Error', status: 'failed' }, { status: 500 });
    }
}
