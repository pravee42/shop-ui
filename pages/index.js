import Head from 'next/head';
import NavBar from '../components/navbar';
import styles from '../styles/Home.module.css';
import Home1 from '../components/db/db';
import { AUTHKEY } from '../components/data/config';
import Login from './company/login';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Chaya Time</title>
				<meta name='description' content='Shop App created by Abipravi' />
				<link rel='icon' href='/download.png' />
			</Head>
			{AUTHKEY !== '' ? (
				<div className='display-flex-row-padding-3 '>
					<NavBar />
					<div className='contents-body'>
						<Home1 />
					</div>
				</div>
			) : (
				<div className='display-flex-row-padding-3 '>
					<Login />
				</div>
			)}
		</div>
	);
}
