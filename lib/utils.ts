import { add } from 'date-fns';

export const remToPx = (rem) => {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
