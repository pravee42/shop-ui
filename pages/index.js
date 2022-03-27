import Head from 'next/head';
import Image from 'next/image';
import NavBar from '../components/navbar';
import ChayaTime from '../assests/download.png';
import styles from '../styles/Home.module.css';
import { AUTHKEY } from '../components/data/config';
import Login from './company/login';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Chaya Time</title>
				<meta name='description' content='Shop App created by Abipravi' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{console.log(AUTHKEY, 'auth key')}
			{AUTHKEY !== '' ? (
				<div className='display-flex-row-padding-3 '>
					<NavBar />
					<div className='contents-body'>
						<Image src={ChayaTime} />
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
