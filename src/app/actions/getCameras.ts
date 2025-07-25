import { prisma } from "@/lib/prism";

export async function getCameras() {
    
    const cameras = await prisma.camera.findMany();

    return cameras;
} 