import { color } from 'framer-motion';
import React from 'react';

interface CircleProgressProps {
	progress: number;
	color: 'blue' | 'tomato' | 'gray' | 'amber' | 'green' | 'purple';
}

const CircleProgress: React.FC<CircleProgressProps> = ({ progress, color }) => {
	const normalizedProgress = Math.min(Math.max(progress, 0), 1);
	const circumference = 2 * Math.PI * 32; // Assuming radius of the circle to be 32
	const strokeDashoffset = circumference - normalizedProgress * circumference;

	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 120 120">
			<circle
				stroke={`transparent`}
				fill="transparent"
				strokeWidth="30"
				r="32"
				cx="60"
				cy="60"
			/>
			<circle
				stroke={`var(--${color}-7)`}
				fill="transparent"
				strokeWidth="12"
				strokeDasharray={`${circumference} ${circumference}`}
				style={{ strokeDashoffset }}
				r="32"
				cx="60"
				cy="60"
				transform="rotate(-90 60 60)"
				className="transition-all duration-200 relative z-0"
			/>

			<circle
				stroke={`var(--${color}-10)`}
				fill="transparent"
				strokeWidth="12"
				r="20"
				cx="60"
				cy="60"
			/>
			<circle
				stroke={`var(--${color}-10)`}
				fill="transparent"
				strokeWidth="12"
				r="44"
				cx="60"
				cy="60"
			/>
		</svg>
	);
};

export default CircleProgress;
