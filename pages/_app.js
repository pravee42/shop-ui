import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				{/* <script src='https://cdn.tailwindcss.com'></script> */}
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;