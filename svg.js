const createJSXComponentFromSVGFile = (path) => {
	const svg = require(path);
	const svgAsString = svg.default.toString();
	const svgAsJSX = svgAsString.replace(/<svg.*?>/, '').replace(/<\/svg>/, '');

	// replace and rewrite props in Jsx
	const svgWithProps = svgAsJSX
		.replace(/fill=".*?"/g, 'fill={color}')
		.replace(/stroke=".*?"/g, 'stroke={color}')
		.replace(/stroke-linecap=".*?"/g, 'strokeLinecap={strokeLinecap}')
		.replace(/stroke-linejoin=".*?"/g, 'strokeLinejoin={strokeLinejoin}')
		.replace(/stroke-miterlimit=".*?"/g, 'strokeMiterlimit={strokeMiterlimit}')
		.replace(/stroke-width=".*?"/g, 'strokeWidth={strokeWidth}');
	return svgWithProps;
};

console.log(createJSXComponentFromSVGFile('./public/percentages/1.svg'));
