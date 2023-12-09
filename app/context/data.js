import { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        // Fetch data using Fetch API
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/data');
                if (response.ok) {
                    const data = await response.json();
                    setFetchedData(data);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
                // Handle errors
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={fetchedData}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
