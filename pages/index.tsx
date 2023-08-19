'use client';
import { useAppSelector } from '../redux/store';
import { SnackTaskStatus } from '../redux/tasks/types';
import { selectTaskByStatus } from '../redux/tasks';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import AppLogo from '../public/app-logo.png';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
	const [loading, setIsLoading] = useState(false);

	const inProgress = useAppSelector((state) =>
		selectTaskByStatus(state, SnackTaskStatus.InProgress),
	);

	const t = (n: number) => n * 1000;
	const router = useRouter();

	const onQuickStart = () => router.push('/home');

	return (
		<main className={'h-screen w-screen flex items-center justify-center'}>
			<div className="w-full max-w-screen-md">
				<div className="flex flex-col items-center mb-16">
					<Image
						src={AppLogo}
						alt={'Logo'}
						height={100}
						width={100}
						className="mb-16"
					/>

					<p className="text-center w-96">
						Get on top of you tasks with a tonne of features built to enhance
						your productivity
					</p>
					<div className="flex justify-center gap-4 mt-4">
						<button
							onClick={onQuickStart}
							className="px-8 py-2 text-white shadow bg-surface-12 rounded-xl">
							Get started now
							<ArrowRightIcon className="w-5 h-5" />
						</button>
					</div>
				</div>
				<div className="fixed left-0 flex justify-end w-full gap-2 px-16 mt-auto bottom-2">
					<p className="uppercase text-surface-10">Version 0.1.0</p>
				</div>
			</div>
		</main>
	);
}
