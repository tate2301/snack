var startTime = null;
let elapsedTime = 0;
let timerInterval = null;

self.onmessage = (event) => {
	switch (event.data) {
		case 'start':
			startTime = Date.now();
			timerInterval = setInterval(() => {
				elapsedTime = Date.now() - startTime;
				postMessage('ticker', elapsedTime);
			}, 1000);
			break;
		case 'pause':
			clearInterval(timerInterval);
			timerInterval = null;
			break;
		default:
			console.error('Unknown command:', event.data);
	}
};

