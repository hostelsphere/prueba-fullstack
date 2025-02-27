import { useTranslation } from 'react-i18next';

export const JoinSection = () => {
	const { t } = useTranslation();

	return (
		<div className="text-center">
			<p className="mb-6 text-lg">{t('until_transform')}</p>
			<button className="rounded-full bg-button-secondary px-10 py-3 text-dark-background hover:border hover:border-solid
                                            hover:border-button-secondary hover:bg-transparent hover:text-button-secondary">
				{t('join_movement')}
			</button>
		</div>
	);
};
