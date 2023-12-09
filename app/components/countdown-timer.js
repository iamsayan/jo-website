import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [time, setTime] = useState(calculateTimeLeft());
    const [countdownFinished, setCountdownFinished] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const timeLeft = calculateTimeLeft();
            if (Object.keys(timeLeft).length === 0) {
                setCountdownFinished(true);
            } else {
                setTime(timeLeft);
            }
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formatTime = (timeUnit) => {
        return timeUnit < 10 ? `0${timeUnit}` : `${timeUnit}`;
    };

    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{"--value":formatTime(time.days)}}></span>
                </span>
                days
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{"--value":formatTime(time.hours)}}></span>
                </span>
                hours
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{"--value":formatTime(time.minutes)}}></span>
                </span>
                min
            </div>
            <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{"--value":formatTime(time.seconds)}}></span>
                </span>
                sec
            </div>
        </div>
    );
};

export default CountdownTimer;