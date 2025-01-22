import React, { useState, useEffect, useRef } from 'react';


export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [reset, setReset] = useState(true);
    const timerRef = useRef(null);

    const handleStartPause = () => {
        if (isRunning) {
            clearInterval(timerRef.current);
            setIsRunning(false);
        } else {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
            setIsRunning(true);
            setReset(false);
        }
    };

    const handleReset = () => {
        clearInterval(timerRef.current);
        setTime(0);
        setIsRunning(false);
        setReset(true);
    };

    const formatTime = (time) => {
        const hours = String(Math.floor(time / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);


    return (
        <>
            <div className='watch-container'>
                <div className='watch-display'>
                    <div className={`${reset?"":isRunning ? "rotating-container" : "rotating-container paused"}`}>
                        <div className="spinner"></div>
                    </div>
                    <span>{formatTime(time)}</span>
                </div>
                <div className="btn-container">
                    <button className='pause-btn' onClick={handleStartPause}>
                        <i className={`fa-solid ${isRunning ? 'fa-pause' : 'fa-play'}`}></i>
                    </button>
                    <button className='reset-btn' onClick={handleReset} disabled={time==0}>
                        <i class="fa-solid fa-rotate-left"></i>
                    </button>
                </div>
            </div>
        </>
    )
}
