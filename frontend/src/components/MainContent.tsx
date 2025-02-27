import { HeroSection } from './HeroSection';
import { Countdown } from './Countdown';
import { JoinSection } from './JoinSection';

export const MainContent = () => {
	return (
		<main className="container mx-auto flex flex-grow flex-col items-center justify-center px-4 py-12">
			<HeroSection />
			<Countdown />
			<JoinSection />
		</main>
	);
};
