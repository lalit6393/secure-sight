import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create Cameras
  const cameras = await prisma.camera.createMany({
    data: [
      { name: 'Camera - 01', location: 'Ground Level' },
      { name: 'Camera - 02', location: 'Sub Level -1' },
      { name: 'Camera - 03', location: 'Main Gate' },
    ],
  })

  // Fetch created cameras to use their IDs
  const cameraList = await prisma.camera.findMany()

  const threatTypes = ['Unauthorized Access', 'Gun Threat', 'Face Recognised']
  const thumbnails = [
    '/thumbnails/thumb1.svg',
    '/thumbnails/thumb2.svg',
    '/thumbnails/thumb3.svg',
    '/thumbnails/thumb4.svg',
    '/thumbnails/thumb5.svg',
    '/thumbnails/thumb6.svg',
  ]

  const now = new Date()

  for (let i = 0; i < 12; i++) {
    const camera = cameraList[i % cameraList.length]
    const startTime = new Date(now.getTime() - i * 60 * 60 * 1000) // spread out hourly
    const endTime = new Date(startTime.getTime() + 5 * 60 * 1000) // 5 minutes duration

    await prisma.incident.create({
      data: {
        cameraId: camera.id,
        type: threatTypes[i % threatTypes.length],
        tsStart: startTime,
        tsEnd: endTime,
        thumbnailUrl: thumbnails[i % thumbnails.length],
        resolved: i % 4 === 0, // every 4th incident is resolved
      },
    })
  }

  console.log('Seeded cameras and incidents successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
