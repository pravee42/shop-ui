import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import { Authcontext } from '../components/context';
import 'nprogress/nprogress.css';
import '../styles/globals.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
	const [AUTHKEY, setAUTHKEY] = useState('');

	function findAuth() {
		if (process.browser) {
			localStorage.getItem('authkey')
				? setAUTHKEY(localStorage.getItem('authkey').toString())
				: '';
		}
	}

	useEffect(() => {
		findAuth();
	});

	return (
		<Authcontext.Provider value={{ AUTHKEY, findAuth }}>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/download.png' />
				<link
					href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
					rel='stylesheet'
					integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
					crossorigin='anonymous'></link>
				<script
					src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
					integrity='sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p'
					crossorigin='anonymous'></script>
				<script
					src='https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js'
					integrity='sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB'
					crossorigin='anonymous'></script>
				<script
					src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js'
					integrity='sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13'
					crossorigin='anonymous'></script>
				<link
					rel='stylesheet'
					href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css'></link>
			</Head>
			<Component {...pageProps} />
		</Authcontext.Provider>
	);
}

export default MyApp;
