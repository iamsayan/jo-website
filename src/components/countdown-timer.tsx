'use client';

import React from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { paytoneOne } from "@/fonts";
import { cn } from "@/utils/functions";
import { useState, useEffect } from 'react'

interface CountdownTimerProps {
    className?: string;
    targetDate: Date | number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ className, targetDate }) => {
    const classes = cn('countdown-area', className);
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    useEffect(() => {
        setIsLoaded(true)
    }, []);

    if (!isLoaded) {
        return null
    }

    const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds, completed }) => {
        const timer = [
            {
                label: 'Days',
                data: days
            },
            {
                label: 'Hours',
                data: hours
            },
            {
                label: 'Minutes',
                data: minutes
            },
            {
                label: 'Seconds',
                data: seconds
            }
        ];

        if (completed) {
            return <span>Countdown has ended!</span>;
        } else {
            return (
                <div className={`grid grid-flow-col gap-3 justify-center text-center auto-cols-max ${classes}`}>
                    {timer.map((item, index) => (
                        <div className="flex flex-col gap-2 border-slate-800 border-2 p-3 sm:p-4 md:p-5 rounded-sm bg-gray-100" key={index}>
                            <span className={`countdown text-2xl sm:text-4xl md:text-5xl text-yellow-500 ${paytoneOne.className}`}>
                                <span style={{ "--value": item.data } as React.CSSProperties}></span>
                            </span>
                            <span className="countdown-label text-sm sm:text-base md:text-md">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return <Countdown date={targetDate} renderer={renderer} />;
};

export default CountdownTimer;