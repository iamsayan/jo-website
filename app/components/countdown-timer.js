'use client'

import Countdown from 'react-countdown';
import React from 'react';
import NoSsr from "@/app/components/nossr";
import classNames from 'classnames';
import { paytoneOne } from "@/app/fonts";

const CountdownTimer = ({ className, targetDate }) => {
    const classes = classNames( 'countdown-area', className );

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
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
        ]

        if (completed) {
            return <span>Countdown has ended!</span>;
        } else {
            return (
                <div className={ `grid grid-flow-col gap-3 justify-center text-center auto-cols-max ${classes}` }>
                    {timer.map((segment, index) => (
                        <div className="flex flex-col gap-2 border-slate-800 border-2 p-3 sm:p-4 md:p-5 rounded bg-gray-100" key={index}>
                            <span className={`countdown text-2xl sm:text-4xl md:text-5xl text-yellow-500 ${paytoneOne.className}`}><span style={{"--value":segment?.data}}></span></span>
                            <span className="countdown-label text-sm sm:text-base md:text-md">{segment?.label}</span>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return <NoSsr><Countdown date={targetDate} renderer={renderer} /></NoSsr>;
};

export default CountdownTimer;