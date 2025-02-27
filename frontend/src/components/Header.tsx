import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

export const Header = () => {
	const { t, i18n } = useTranslation();
	const selectRef = useRef(null);

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	const handleGlobeClick = () => {
		if (selectRef.current) {
			(selectRef.current as HTMLSelectElement).focus();
			(selectRef.current as HTMLSelectElement).click();
		}
	};

	return (
		<header className="flex h-[84px] w-full justify-between px-4 py-4 md:px-[100px] lg:px-[200px] xl:px-[300px]">
			<div
				className={`container flex h-full w-full max-w-[1320px] items-center justify-between border-b border-white/40 pb-4`}
			>
				<h1 className="text-xl font-light">{t('app_name')}</h1>
				<div className="flex h-full items-center gap-4">
					<button
						className={`h-9 rounded-full bg-button-secondary px-4 py-1 font-normal text-dark-background`}
					>
						Beta
					</button>

					<div className="flex items-center justify-center sm:hidden">
						<button
							onClick={handleGlobeClick}
							className="rounded-full bg-transparent p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
							aria-label={t('change_language')}
						>
							<GlobeAltIcon className="h-6 w-6 text-white" />
						</button>
					</div>

					<div className="relative hidden items-center justify-center sm:flex">
						<GlobeAltIcon className="pointer-events-none absolute left-3 top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform text-white" />
						<select
							ref={selectRef}
							className={`h-9 w-[60px] appearance-none rounded-[30px] border border-white bg-transparent px-2.5 py-1 pl-8 pr-4 text-center text-sm text-white sm:w-[80px] sm:pl-8 sm:pr-4 lg:w-[100px] lg:pl-8 lg:pr-4`}
							value={i18n.language}
							onChange={(e) => changeLanguage(e.target.value)}
							aria-label={t('select_language')}
						>
							<option
								value="es"
								className={`text-transparent sm:text-sm lg:text-base`}
							>
								ES
							</option>
							<option
								value="en"
								className={`text-transparent sm:text-sm lg:text-base`}
							>
								EN
							</option>
						</select>
						<div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform">
							<ChevronDownIcon className="h-4 w-4 text-white" />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
