import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <div
      className="container p-2 bg-white rounded-xl h-screen mx-auto  text-zinc-800 overflow-hidden subpixel-antialiased text-base"
      id="app-container"
    >
      <Component {...pageProps} />
    </div>
  );
}
