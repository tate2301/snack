('use client');
import { useAppDispatch, useAppSelector } from '../redux/store';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { applicationSettings, updateSettings } from '../redux/settings';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets';
import { useEffect, useLayoutEffect } from 'react';

export default function Splash() {
	const dispatch = useAppDispatch();
	const settings = useAppSelector(applicationSettings);
	const navigate = useNavigate();


	const onQuickStart = () => {
		dispatch(
			updateSettings({
				...settings,
				onboarded: true,
			}),
		);
		navigate('/home');
	};

	useEffect(() => {
		if (settings.onboarded) {
			navigate('/home');
		}
	}, [navigate, settings.onboarded]);

	console.log({ settings });

	return (
		<main className={'h-screen w-screen flex items-center justify-center'}>
			<div className="w-full max-w-screen-md">
				<div className="flex flex-col items-center mb-16">
					<img
						src={assets.images.AppLogo}
						alt={'Logo'}
						height={100}
						width={100}
						className="mb-16"
					/>
					{settings && (
						<>
							<p className="text-center w-96">
								Get on top of you tasks with a tonne of features built to
								enhance your productivity
							</p>
							<div className="flex justify-center gap-4 mt-4">
								<button
									onClick={onQuickStart}
									className="px-8 py-2 text-white shadow bg-surface-12 rounded-xl">
									Get started now
									<ArrowRightIcon className="w-5 h-5" />
								</button>
							</div>
						</>
					)}
				</div>
				<div className="fixed left-0 flex justify-end w-full gap-2 px-16 mt-auto bottom-2">
					<p className="uppercase text-surface-10">Version 0.1.0</p>
				</div>
			</div>
		</main>
	);
}
