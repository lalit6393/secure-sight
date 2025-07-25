'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DoorOpen, Siren, SkipBack, SkipForward, UserSearch } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useDataContext } from '@/providers/DataContext';
const Clock = dynamic(() => import('../molecules/clock/Clock'), { ssr: false });

type Cameratype = {
    id: string,
    name: string,
    location: string
}

const Timeline = ({ cameras }: { cameras: Cameratype[] }) => {

    const [length, setLength] = useState<number>(10);
    const { incidents } = useDataContext();
    const [left, setLeft] = useState<number>(167);
    const dragRef = useRef(false);
    const eventsRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement | null>(null);
    const marginRef = useRef<HTMLDivElement | null>(null);
    const [currentTime, setCurrentTime] = useState('00:00:00');
    const [scale, setScale] = useState(2);

    const barsContent = useMemo(() => (
        <>
            {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="flex-1 h-full">
                    <div className="flex-1 h-1/2"></div>
                    <div className="flex-1 h-1/2 border-l"></div>
                </div>
            ))}
        </>
    ), []);



    const attributes = (type: string) => {
        if (type === 'Unauthorized Access') return { css: ' text-[#FDBA74] bg-[#7F1D1D] border-l-2 border-l-[#FDBA74] ', icon: <DoorOpen className='text-[#F43F5E] h-3 w-3' /> }
        else if (type === 'Gun Threat') return { css: ' text-[#FDBA74] bg-[#7F1D1D] border-l-2 border-l-[#FDBA74] ', icon: <Siren className='text-[#F43F5E] h-3 w-3' /> }
        else if (type === 'Face Recognised') return { css: ' bg-[#172554] text-[#93C5FD] border-l-2 border-l-[#93C5FD] ', icon: <UserSearch className='text-[#3B82F6] h-3 w-3' /> }
    }

    const toPercentage = (time: string) => {
        const date = new Date(time);

        if (!timelineRef.current) return 18000;

        const rect = timelineRef.current.getBoundingClientRect();
        const totalMinutes = length * 60; // 1200 mins in 18hr
        const maxX = rect.width;

        const h = date.getHours();
        const m = date.getMinutes();
        return (maxX / totalMinutes) * (h * 60 + m) * scale;
    };

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!marginRef.current) return;

        const marginBox = marginRef.current.getBoundingClientRect();
        const ignoreWidth = marginBox.width + 7;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (dragRef.current && x >= 167) {
            setLeft(x);
            setCurrentTime(getTimelineTime(x, ignoreWidth));
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!marginRef.current) return;

        const marginBox = marginRef.current.getBoundingClientRect();
        const ignoreWidth = marginBox.width + 7;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x >= ignoreWidth) {
            setLeft(x);
            setCurrentTime(getTimelineTime(x, ignoreWidth));
        }
    }

    const getTimelineTime = (x: number, ignoreWidth: number) => {

        if (!timelineRef.current) return '00:00:00';

        const rect = timelineRef.current.getBoundingClientRect();
        const totalMinutes = length * 60; // 1200 mins in 18hr
        const maxX = rect.width;

        const clampedX = Math.max(0, Math.min(x - ignoreWidth, maxX));

        const minutes = ((clampedX / maxX) * totalMinutes) / scale;

        const hrs = Math.floor(minutes / 60);
        const mins = Math.floor(minutes % 60);
        const secs = Math.floor((minutes % 1) * 60);

        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    };


    useEffect(() => {
        const handleMouseUp = () => {
            dragRef.current = false;
        };

        const handleResize = () => {
            if (!timelineRef.current) return;
            const width = timelineRef.current.clientWidth;
            let newLength = Math.floor(width / 40);
            if (newLength > 24) newLength = 24;
            setLength(newLength);
        }

        handleResize();

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            setScale(prev => e.deltaY < 0 ? Math.min(prev + 0.1, 10) : Math.max(prev - 0.1, 1));
        };

        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('resize', handleResize);

        if (eventsRef.current) {
            eventsRef.current.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('resize', handleResize);
            eventsRef.current?.removeEventListener('wheel', handleWheel);
        }
    }, []);

    return (
        <div className='p-4 flex flex-col w-full gap-2 noselect overflow-hidden'>
            <div className='flex w-full bg-[#131313] gap-5 px-4 py-2 rounded-xl items-center text-slate-50'>
                <SkipBack className='text-slate-50 w-4 h-4 cursor-pointer' />
                <Image
                    src={'/back10.svg'}
                    alt='back10'
                    width={18}
                    height={18}
                    className='cursor-pointer'
                />
                <Image
                    src={'/play.svg'}
                    alt='back10'
                    width={24}
                    height={24}
                    className='cursor-pointer'
                />
                <Image
                    src={'/forward10.svg'}
                    alt='back10'
                    width={18}
                    height={18}
                    className='cursor-pointer'
                />
                <SkipForward className='text-slate-50 w-4 h-4 cursor-pointer' />
                <Clock />
                <div className='flex items-center gap-2'>
                    <p className='text-xs'>1x</p>
                    <Image
                        src={'/playspeed.svg'}
                        alt='back10'
                        width={18}
                        height={18}
                    />
                </div>
            </div>
            <div className="relative flex flex-col text-white bg-[#131313] rounded-xl">
                <div
                    style={{ borderLeft: '1px solid #FFCC00', left: `${left}px` }}
                    className='absolute bottom-0 h-[calc(100%-15px)] z-10 w-[2px]'
                >
                    <div className='bg-[#FFCC00] text-[9px] text-black rounded-2xl px-2 relative w-fit right-[27px] bottom-[10px]'>{currentTime}s</div>
                </div>
                <div className="flex text-xs text-white p-2">
                    <div className="sm:w-40 w-26 flex shrink-0 items-center">
                        <p className='sm:text-base text-sm'>Camera List</p>
                    </div>
                    <div className="flex-1 flex" ref={timelineRef}>
                        {Array.from({ length: length / scale }).map((_, i) => (
                            <div key={i} className="flex-1 text-[9px] h-[28px]">
                                <div className='h-[calc(100%-5px)] flex shrink-0 items-end'>{i < 10 ? `0${i}:00` : `${i}:00`}</div>
                                <div className='flex shrink-0 border-l h-[10px]'>
                                    <div className='flex-1 h-full'>
                                        <div className='flex-1 h-1/2'></div>
                                        <div className='flex-1 h-1/2'></div>
                                    </div>
                                    {barsContent}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    ref={eventsRef}
                    onClick={handleClick}
                    onMouseDown={() => dragRef.current = true}
                    onMouseUp={() => dragRef.current = false}
                    onMouseMove={handleMove}
                    className='relative flex flex-col w-full'
                >
                    {cameras.map((cam) => (
                        <div key={cam.id} className="flex items-center sm:h-[42px] h-[34px] hover:bg-[#232323]">
                            <div className="w-26 pl-2 sm:w-40" ref={marginRef}>
                                <p className='sm:text-sm text-xs'>{cam.name}</p>
                            </div>
                            <div className="relative flex-1 h-full overflow-hidden">
                                {incidents &&
                                    incidents
                                        .filter(e => e.camera.id === cam.id && !e.resolved)
                                        .map((e, i) => (
                                            <div
                                                key={e.id || i}
                                                className={`absolute flex items-center top-1/2 -translate-y-1/2 h-5 text-xs px-2 rounded ${attributes(e.type)?.css} whitespace-nowrap`}
                                                style={{
                                                    zIndex: Math.floor(toPercentage(e.tsStart.toString())),
                                                    left: `${toPercentage(e.tsStart.toString())}px`,
                                                    minWidth: `${toPercentage(e.tsEnd.toString()) - toPercentage(e.tsStart.toString())}%`
                                                }}
                                            >
                                                <div className='flex h-full items-center pr-1'>{attributes(e.type)?.icon}</div>
                                                {e.type}
                                            </div>
                                        ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Timeline
