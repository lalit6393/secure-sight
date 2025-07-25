'use client'
import React, { createContext, useContext, useEffect, useState } from "react";

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

interface ContextType {
    stateChange: boolean;
    setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
    resolved: number;
    unresolved: number;
    incidents: IncidentType[] | null
}

const initialState: ContextType = {
    stateChange: false,
    setStateChange: () => { },
    resolved: 0,
    unresolved: 0,
    incidents: []
}

const DataContext = createContext(initialState);

export default function DataContextProvider({ children }: { children: React.ReactNode }) {

    const [stateChange, setStateChange] = useState(false);
    const [incidents, setIncidents] = useState<IncidentType[] | null>([]);
    const [resolved, setResolved] = useState<number>(0);
    const [unresolved, setUnresolved] = useState<number>(0);

    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
        console.log("baseUrl",baseUrl);
        fetch(`${baseUrl}/api/incidents`)
            .then(res => res.json())
            .then(data => {
                const unres = data.filter((i: IncidentType) => !i.resolved);
                setIncidents(unres);
                setResolved(data.length - unres.length);
                setUnresolved(unres.length);
            });
    }, [stateChange])

    return (
        <DataContext.Provider value={{ stateChange, setStateChange, resolved, unresolved, incidents }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);