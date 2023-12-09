'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { getSingletonData } from "@/app/utils/fetch";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSingletonData( 'home' )
                setFetchedData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={fetchedData}>
            {children}
        </DataContext.Provider>
    );
}

export const useDataContext = () => useContext(DataContext);
