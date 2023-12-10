import { ipcRenderer } from 'electron';
import { useLayoutEffect, useState } from 'react';

import localforage from 'localforage';

// Create a cache instance
const iconCache = localforage.createInstance({
	name: 'iconCache',
});

// Create a map to store preloaded icons
const preloadedIcons: { [key: string]: string } = {};

export const createFromSFSymbol = async (name: string, color: string) => {
	const key = `${name}-${color}`;

	// If the icon is in the preloaded icons, return it
	if (preloadedIcons[key]) {
		return preloadedIcons[key];
	}

	// If the icon is in the cache, return it
	const cachedIcon = await iconCache.getItem<string>(key);
	if (cachedIcon) {
		preloadedIcons[key] = cachedIcon; // Store in preloaded icons
		return cachedIcon;
	}

	// If the icon is not in the cache, fetch it and store it in the cache
	const icon = await ipcRenderer.invoke('get-icon', { name, color });
	preloadedIcons[key] = icon; // Store in preloaded icons
	await iconCache.setItem(key, icon);
	return icon;
};

export const useSFSymbol = (name: string, color: string): string => {
	const [imageSrc, setImageSrc] = useState('');

	useLayoutEffect(() => {
		createFromSFSymbol(name, color).then((dataUrl) => {
			const img = new Image();
			img.src = dataUrl; // Preload the image
			img.onload = () => {
				setImageSrc(dataUrl); // Set the image source after it's loaded
			};
		});
	}, [name, color]); // Add dependencies to the effect

	return imageSrc;
};
