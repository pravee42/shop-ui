import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import ChayaTimeLogo from '../../assests/download.png';
import { RegisterUser } from '../data/config';
export default function Register() {
	const [registerData, setRegisterData] = useState({
		shop_name: '',
		user: '',
		email: '',
		password: '',
	});
	const Register_Function = async () => {
		await RegisterUser(registerData);
	};
	return (
		<div>
			<Toaster />
			<div className='flex flex-row gap-3 items-center justify-evenly w-[100vw] flex-wrap'>
				<Image src={ChayaTimeLogo} alt='Logo' />
				<div className='mt-8 space-y-6 w-[200px]'>
					<span className='block text-xl font-medium text-slate-700'>
						Register
					</span>
					<label className='block'>
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							Email
						</span>
						<input
							onChange={(e) =>
								setRegisterData({
									...registerData,
									email: e.target.value,
								})
							}
							type='email'
							className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
							placeholder='Email Address'
						/>
					</label>
					<label className='block'>
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							Shop Name
						</span>
						<input
							onChange={(e) =>
								setRegisterData({
									...registerData,
									shop_name: e.target.value,
								})
							}
							type='text'
							className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
							placeholder='Shop Name'
						/>
					</label>
					<label className='block'>
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							User Name
						</span>
						<input
							onChange={(e) =>
								setRegisterData({
									...registerData,
									user: e.target.value,
								})
							}
							type='text'
							className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
							placeholder='User Name'
						/>
					</label>
					<label className='block'>
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							Password
						</span>
						<input
							onChange={(e) =>
								setRegisterData({
									...registerData,
									password: e.target.value,
								})
							}
							type='password'
							className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
							placeholder='Password'
						/>
					</label>
					<button
						className='border border-blue-600 p-2 text-blue-800 hover:bg-blue-600 hover:text-slate-200 rounded focus:ring'
						onClick={Register_Function}>
						Register
					</button>
					<button
						className='border border-blue-600 p-2 text-blue-800 hover:bg-blue-600 hover:text-slate-200 rounded focus:ring m-2'
						onClick={() => {
							window.location.reload();
						}}>
						Back
					</button>
				</div>
			</div>
		</div>
	);
}
