'use client'
import { ChevronRight, Clock5, TriangleAlert, CheckCheck, DoorOpen, Plus, UserSearch } from 'lucide-react';
import Image from "next/image";
import { useDataContext } from '@/providers/DataContext';
import { useState } from 'react';

type Cameratype = {
    id: string,
    name: string,
    location: string
}

type IncidentType = {
    camera: Cameratype,
    cameraId: string,
    id: string,
    resolved: boolean,
    thumbnailUrl: string,
    tsEnd: Date,
    tsStart: Date,
    type: string
}

export default function IncidentList() {

    const { setStateChange, incidents, resolved, unresolved } = useDataContext();
    const [currentThreat, setCurrentThreat] = useState<IncidentType | null>(null);
    const [open, setOpen] = useState(false);

    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const formatDate = (date: Date) =>
        `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;


    const incidentIcon = (type: string) => {
        if (type === 'Unauthorized Access') return 'auth';
        else if (type === 'Gun Threat') return 'gun';
        else if (type === 'Face Recognised') return 'faceRecongnized';
    }

    const resolveIncident = async (id: string) => {
        await fetch(`/api/incidents/${id}/resolve`, { method: 'PATCH' });
        setStateChange(prev => !prev);
        setOpen(false);
    }

    return (
        <div className={`relative flex flex-col w-full`}>
            {open && currentThreat &&
                <div className='present flex justify-center items-center text-slate-700'>
                    <div className='flex flex-col p-4 rounded-xl bg-slate-50 w-70 gap-4'>
                        <p className='text-sm'>Are you sure you want to &nbsp;
                            <span className='text-[#FFCC00]'>Resolve</span>
                            &nbsp;
                            {currentThreat && currentThreat.type}
                            &nbsp;
                            incident?
                        </p>
                        <div className='flex justify-between'>
                            <button onClick={() => setOpen(false)} className='text-blue-700 text-sm hover:text-blue-900 cursor-pointer'>Cancel</button>
                            <button onClick={() => resolveIncident(currentThreat.id)} className='text-green-700 hover:text-green-900 text-sm cursor-pointer'>Confirm</button>
                        </div>
                    </div>
                </div>
            }
            <div className='flex flex-col sm:flex-row justify-between p-2 pb-4 sm:gap-0.5 gap-2 sticky top-0 left-0 right-0 bg-[#131313]'>
                <div className='flex gap-2 items-center'>
                    <TriangleAlert className='bg-[#7F1D1D] text-[#F87171] p-1 border border-[#450A0A] rounded-full' />
                    <p className='text-sm font-semibold text-slate-50'>{unresolved} Unresolved Incidents</p></div>
                <div className='flex'>
                    <div className='sm:flex items-center hidden'>
                        <DoorOpen className='relative left-2 w-4 h-4 p-0.5 text-[#F87171] rounded-full bg-[#7F1D1D]' />
                        <Plus className='relative left-1 w-4 h-4 p-0.5 text-[#F87171] rounded-full bg-[#7F1D1D]' />
                        <UserSearch className='relative  w-4 h-4 p-0.5 text-[#3B82F6] rounded-full bg-[#172554]' />
                    </div>
                    <div className='flex gap-1 items-center border border-[#404040] px-2 rounded-4xl'>
                        <CheckCheck className='w-3 h-3 text-[#22C55E]' />
                        <p className='text-xs text-slate-50'>{resolved} resolved incidents</p>
                    </div>
                </div>
            </div>
            {incidents?.map(incident => (
                <div key={incident.id} className="bg-transparent p-2 flex flex-col w-full lg:w-max m-0">
                    <div className='h-fit flex items-center gap-4'>
                        <img src={incident.thumbnailUrl} className="w-30 h-18 rounded-lg object-cover border-2 border-[#2b2a2a]" />
                        <div className="flex-1 flex-col justify-between shrink-0">
                            <div className="flex gap-1 font-semibold">
                                <Image
                                    src={`/${incidentIcon(incident.type)}.svg`}
                                    alt={'in'}
                                    width={12}
                                    height={12}
                                    className="text-[#EF4444]"
                                />
                                <p className="text-xs font-semibold text-slate-50">{incident.type}</p>
                            </div>
                            <div className="flex flex-col text-slate-50 mt-2 shrink-0">
                                <div className='flex gap-1'>
                                    <Image
                                        src='/camera.svg'
                                        alt='camera'
                                        width={12}
                                        height={12}
                                    />
                                    <p className="text-[11px]">{incident.camera.location}</p>
                                </div>
                                <div className='flex gap-1 shrink-0'>
                                    <Clock5 className="w-3 h-3" />
                                    <p className="text-[11px] font-semibold md:whitespace-nowrap">{`${formatTime(new Date(incident.tsStart))} - ${formatTime(new Date(incident.tsEnd))} on ${formatDate(new Date(incident.tsStart))}`}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setCurrentThreat(incident);
                                setOpen(true);
                            }}
                            className="sm:flex hidden px-3 py-1 text-[#FFCC00] text-xs cursor-pointer"
                        >
                            Resolve
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            setCurrentThreat(incident);
                            setOpen(true);
                        }}
                        className="flex sm:hidden px-3 py-1 text-[#FFCC00] text-xs cursor-pointer justify-end"
                    >
                        Resolve
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    )
}
