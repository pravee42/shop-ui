import React from 'react';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { RiBillFill } from 'react-icons/ri';
import { MdRestaurantMenu, MdMiscellaneousServices } from 'react-icons/md';
import { FaFileInvoice } from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';
import { SHOPEMAILID } from '../components/data/config';

export default function NavBar() {
	return (
		<div className='page'>
			<div className='nav-bar'>
				<div className='nav-bar-1'>
					<Link href='/company/home' className='button-navbar-link'>
						Dashboard
					</Link>
					<Link href='/company/product' className='button-navbar-link'>
						Product
					</Link>
					<Link href='/bill/bill' className='button-navbar-link'>
						Bill
					</Link>
					<Link href='/filter/filter' className='button-navbar-link'>
						Filter Bill
					</Link>
					{/* <Link href='/company/service' className='button-navbar-link'>
						Service
					</Link>
					<Link href='/company/quotation' className='button-navbar-link'>
						Quotation
					</Link> */}
					<Link href='/report/report' className='button-navbar-link'>
						Monthly Report
					</Link>
					<button
						onClick={() => {
							if (process.browser) {
								localStorage.clear();
								window.location.href = '/';
							}
						}}
						className='text'>
						Log out
					</button>
				</div>
				<div className='nav-bar-2 p-2'>
					<Link href='/company/home' className='button-navbar-link m-[5px]'>
						<span style={{ fontSize: '20px' }}>
							<AiFillHome />
						</span>
					</Link>
					<Link href='/company/product' className='button-navbar-link m-[5px]'>
						<span style={{ fontSize: '20px' }}>
							<MdRestaurantMenu />
						</span>
					</Link>
					<Link href='/bill/bill' className='button-navbar-link m-[5px]'>
						<span style={{ fontSize: '20px' }}>
							<RiBillFill />
						</span>
					</Link>
					{/* <Link href='/company/service' className='button-navbar-link m-[5px]'>
						<span style={{ fontSize: '20px' }}>
							<MdMiscellaneousServices />
						</span>
					</Link>
					<Link href='/company/quotation' className='button-navbar-link m-[5px]'>
						<span style={{ fontSize: '20px' }}>
							<FaFileInvoice />
						</span>
					</Link> */}
					<Link href='/report/report' className='button-navbar-link m-[5px]'>
						<span style={{ fontSize: '20px' }}>
							<HiDocumentReport />
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
