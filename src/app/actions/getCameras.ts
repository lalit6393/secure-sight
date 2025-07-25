import { prisma } from "@/lib/prisma";

export async function getCameras() {
    
    const cameras = await prisma.camera.findMany();

    return cameras;
} 