'use client'
import Image from "next/image";
import { useEffect, useState, forwardRef } from "react";
import dynamic from 'next/dynamic';
const Clock = dynamic(() => import('../molecules/clock/Clock'), { ssr: false });
import { CalendarDays, EllipsisVertical, Disc } from 'lucide-react';
import { LoadingSpinner } from "../molecules/loader/LoadingSpinner";

type Cameratype = {
    id: string,
    name: string,
    location: string
}

const IncidentPlayer = forwardRef<HTMLDivElement | null, { cameras: Cameratype[] }>(({ cameras }, ref) => {

    const [activeCamera, setActiveCamera] = useState<Cameratype | null>(null);

    const handleCameraChange = (id: string) => {
        const newCam = cameras.find((camera: Cameratype) => camera.id === id);
        if (newCam) setActiveCamera(newCam);
    }

    const thumbUrl = (cam: string) => {
        if (cam === 'Camera - 01') return 'thumb1';
        else if (cam === 'Camera - 02') return 'thumb2';
        else if (cam === 'Camera - 03') return 'thumb3';
    }

    useEffect(() => {
        if (!activeCamera) setActiveCamera(cameras[0]);
    }, [cameras, activeCamera])

    return (
        <>
            <div ref={ref} className="relative w-full rounded-xl bg-[#131313] overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                {
                    !activeCamera ? <div className="flex items-center justify-center w-full h-full"><LoadingSpinner /></div> :
                        <>
                            <Image
                                src={`/thumbnails/${thumbUrl(activeCamera.name)}.svg`}
                                alt="Video"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute flex flex-col justify-between w-full inset-0 bg-transparent">
                                <div className="block">
                                    <div className="flex gap-1 ml-2 mt-3 w-fit py-1 px-2 rounded bg-black">
                                        <CalendarDays className="text-[#78716C] w-4 h-4" />
                                        <Clock />
                                    </div>
                                </div>
                                <div className="flex justify-between w-full mb-3 px-2">
                                    <div className="flex items-end">
                                        <div className="flex bg-black px-2 py-1 rounded gap-1">
                                            <Disc className="text-[#EF4444] w-4 h-4" />
                                            <p className="text-xs text-slate-100">{activeCamera.name}</p>
                                        </div>
                                    </div>
                                    <div className="sm:flex gap-2 hidden">
                                        {cameras && cameras.map((camera: Cameratype) => {
                                            if (camera.id != activeCamera.id) return (
                                                <div
                                                    onClick={() => handleCameraChange(camera.id)}
                                                    key={camera.id}
                                                    className="relative rounded-md w-[10rem] h-[6rem] overflow-hidden cursor-pointer"
                                                >
                                                    <div className="absolute flex justify-between py-1 px-2 top-0 left-0 right-0 bg-black text-slate-100 text-xs z-10">
                                                        <p>{camera.name}</p>
                                                        <EllipsisVertical className="w-4 h-4" />
                                                    </div>
                                                    <Image
                                                        src={`/thumbnails/${thumbUrl(camera.name)}.svg`}
                                                        alt="Video"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
            {activeCamera && 
            <div className="flex flex-wrap gap-4 sm:hidden p-4">
                {cameras && cameras.map((camera: Cameratype) => {
                    if (camera.id != activeCamera.id) return (
                        <div
                            onClick={() => handleCameraChange(camera.id)}
                            key={camera.id}
                            className="relative rounded-md w-[10rem] h-[6rem] overflow-hidden cursor-pointer"
                        >
                            <div className="absolute flex justify-between py-1 px-2 top-0 left-0 right-0 bg-black text-slate-100 text-xs z-10">
                                <p>{camera.name}</p>
                                <EllipsisVertical className="w-4 h-4" />
                            </div>
                            <Image
                                src={`/thumbnails/${thumbUrl(camera.name)}.svg`}
                                alt="Video"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )
                })}
            </div>
            }
        </>
    )
})

IncidentPlayer.displayName = "IncidentPlayer";

export default IncidentPlayer;