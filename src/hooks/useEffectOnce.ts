import { useRef, useEffect } from 'react';

/**
 * Custom hook that runs code only once when the component mounts
 * @param callback Function to run once
 * @param dependencies Optional array of dependencies that will trigger the callback if they change
 * @returns The result of the callback
 */
export function useEffectOnce<T>(callback: () => T, dependencies: any[] = []): T {
    const initialized = useRef<boolean>(false);
    const result = useRef<T | null>(null);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            result.current = callback();
        }
    }, dependencies);

    return result.current as T;
} 