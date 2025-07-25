'use client'
import { useEffect, useRef, useState } from "react";
import IncidentPlayer from "../IncidentPlayer/Player";
import IncidentList from "../IncidentList/IncidentList";
import Timeline from "../timeline/Timeline";

type Cameratype = {
    id: string,
    name: string,
    location: string
}

export default function DashboardLayout({ cameras }: { cameras: Cameratype[] }) {
    const leftRef = useRef<HTMLDivElement>(null);
    const [leftHeight, setLeftHeight] = useState<number>(0);
    const updateHeight = () => {
        if (leftRef.current) {
            setLeftHeight(leftRef.current.clientHeight);
        }
    };

    useEffect(() => {
        updateHeight();

        window.addEventListener("resize", updateHeight);

        return () => {
            window.removeEventListener("resize", updateHeight);
        };
    }, []);


    return (
        <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row w-full relative box-border p-4 gap-4">
                <div className="flex w-full lg:w-[calc(100%-448px)] box-border">
                    <div className="w-full">
                        <IncidentPlayer ref={leftRef} cameras={cameras} />
                    </div>
                </div>
                <div style={{ height: `${leftHeight}px`, padding: '10px' }} className="flex w-full lg:w-auto min-w-fit box-border overflow-hidden rounded-xl bg-[#131313]">
                    <div className={`flex w-full lg:w-auto shrink-0 overflow-y-auto box-border`}>
                        <IncidentList />
                    </div>
                </div>
            </div>
            <Timeline cameras={cameras} />
        </div>
    );
}
