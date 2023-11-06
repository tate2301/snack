export const colors = ['blue', 'tomato', 'green', 'amber', 'gray', 'purple'];

export const getRandomColor = () =>
	colors[Math.floor(Math.random() * colors.length)];
