import { useEffect, useState } from 'react';
import { Header } from './Header';
import { MainContent } from './MainContent';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

export const Layout = () => {
    const isMobile = useIsMobile();

    return (
        <div className="flex min-h-screen flex-col bg-main-background bg-radial-hostel text-white">
            <Header />
            <div
                className={`container mx-auto w-full max-w-[1320px] flex-grow flex flex-col justify-center ${isMobile ? 'max-w-sm px-4' : ''}`}
            >
                <MainContent />
            </div>
        </div>
    );
};
