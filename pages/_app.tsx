import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <div
      className="container bg-white rounded-xl h-screen mx-auto font-medium text-zinc-800 overflow-hidden subpixel-antialiased"
      id="app-container"
    >
      <Component {...pageProps} />
    </div>
  );
}
