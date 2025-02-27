import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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

export const HeroSection = () => {
    const { t } = useTranslation();
    const isMobile = useIsMobile();

    return (
        <div className="mb-10 text-center max-w-6xl mx-auto">
            <p className="mb-4 text-xl font-light md:text-2xl md:block hidden">{t('hero_title')}</p>

            {isMobile ? (
                <p className="mb-8 text-4xl font-normal md:text-5xl">{t('hero_mobile_subtitle')}</p>
            ) : (
                <p className="mb-8 text-4xl font-normal md:text-5xl">{t('hero_subtitle')}</p>
            )}

            {isMobile ? (
                <p className="text-2xl font-medium text-button-secondary md:text-3xl">
                    {t('connect_grow_prosper')}
                </p>
            ) : (
                <p className="text-2xl font-medium text-button-secondary md:text-4xl">
                    {t('connect_grow_prosper')}
                </p>
            )}
        </div>
    );
};