import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TimeSegmentProps {
    label: string;
    value: number;
}

const TimeSegment: React.FC<TimeSegmentProps> = ({ label, value }) => (
    <div className="flex flex-col items-center space-y-3">
        <div className="flex flex-col items-center rounded-xl border px-3 py-6 sm:px-2 sm:py-4 md:px-3 md:py-6 lg:px-4 lg:py-8 xl:px-6 xl:py-10">
            <span className="text-4xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {value.toString().padStart(2, '0')}
            </span>
        </div>
        <span className="text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg">{label}</span>
    </div>
);

export const Countdown: React.FC = () => {
    const { t } = useTranslation();
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30);
        targetDate.setHours(0, 0, 0, 0);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate.getTime() - now;

            if (difference < 0) {
                clearInterval(interval);
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeRemaining({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mb-8 flex gap-4 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6">
            <TimeSegment label={t('days')} value={timeRemaining.days} />
            <TimeSegment label={t('hours')} value={timeRemaining.hours} />
            <TimeSegment label={t('minutes')} value={timeRemaining.minutes} />
            <TimeSegment label={t('seconds')} value={timeRemaining.seconds} />
        </div>
    );
};