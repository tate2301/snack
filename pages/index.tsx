'use client';
import { useAppSelector } from '../redux/store';
import { SnackTaskStatus } from '../redux/tasks/types';
import { selectTaskByStatus } from '../redux/tasks';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import AppLogo from '../public/app-logo.png';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { electronAPI } from '../lib/core/electron';
import { generateUUID } from '../lib/functions';

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
						className="mb-4"
					/>
					<h2 className="text-3xl font-semibold text-surface-12">Snack</h2>
					<p className="uppercase">Version 0.1.0</p>
					<div className="flex justify-center gap-4 mt-4">
						<button
							onClick={onQuickStart}
							className="px-8 py-2 text-white shadow bg-surface-12 rounded-xl">
							Quick start
							<ArrowRightIcon className="w-5 h-5" />
						</button>
					</div>
				</div>
				<div className="flex flex-col py-8 divide-y divide-surface-4">
					<div className="flex items-center justify-between w-full py-4">
						<div>
							<h2 className="text-lg font-semibold text-surface-12">
								Create new snack
							</h2>
							<p>Create a new database on your local machine</p>
						</div>
						<button className="px-4 py-1 rounded-lg text-surface-12 bg-surface-3">
							Create
						</button>
					</div>
					<div className="flex items-center justify-between w-full py-4">
						<div>
							<h2 className="text-lg font-semibold text-surface-12">
								Load existing database
							</h2>
							<p>Transfer existing snack or load a backup database</p>
						</div>
						<button className="px-4 py-1 rounded-lg text-surface-12 bg-surface-3">
							Open
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
