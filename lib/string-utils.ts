const fetchAndExtractTitleAndFavicon = async (url: string) => {
	const response = await fetch(url);
	const html = await response.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const title = doc.querySelector('title')?.innerText;
	const favicon = doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href');
	return { title, favicon };
};