import { useEffect, useState } from 'react';
import SFSymbol from '../../../src/assets/icons/SFSymbol';
import { ipcRenderer } from 'electron';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useTimeServiceActions } from '../context';

export default function BreakTimeOverlay() {
	const [breakTime, setBreakTime] = useState(null);

	const { continueTimer } = useTimeServiceActions();

	useEffect(() => {
		ipcRenderer
			.invoke('break-time')
			.then((data) => {
				setBreakTime(new Date(data));
			})
			.catch((err) => {
				setBreakTime(new Date());
			});
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				ease: 'easeIn',
				type: 'tween',
				duration: 0.3,
			}}
			className="fixed w-screen h-screen top-0 left-0 flex items-center z-[9999] bg-white backdrop-blur-sm">
			<div className="mx-auto my-auto max-w-2xl flex gap-8 flex-col items-center justify-center">
				<SFSymbol
					name={'takeoutbag.and.cup.and.straw'}
					color={'#121212'}
					className="!w-12 !h-12"
				/>
				<div className="flex flex-col items-center gap-4">
					<p className="text-2xl font-medium text-surface-12">
						"Whoa there, Speedy Gonzales! Time for a break!"
					</p>
					<p className="text-center text-lg">
						Take a deep breath, stretch, or grab a cup of coffee. You're on a
						break! Remember, taking regular breaks can help increase
						productivity and maintain high levels of focus. Enjoy your time off,
						you've earned it!
					</p>
				</div>
				<div>
					<button
						onClick={continueTimer}
						className="bg-surface-12 text-white px-4 py-2 rounded-xl">
						<SFSymbol
							name="play.fill"
							color={'#ffffff'}
						/>
						End break
					</button>
				</div>
				<p className="text-surface-10 font-semibold">
					{breakTime
						? `${
								Math.floor(
									(new Date().getTime() - breakTime.getTime()) / 60000,
								) === 0
									? 1
									: Math.floor(
											(new Date().getTime() - breakTime.getTime()) / 60000,
									  )
						  } minute${
								Math.floor(
									(new Date().getTime() - breakTime.getTime()) / 60000,
								) > 1
									? 's'
									: ''
						  }`
						: 'Loading...'}
				</p>
			</div>
		</motion.div>
	);
}
