import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import ChayaTimeLogo from '../../assests/download.png';
import { LoginUser } from '../../components/data/config';
import Register from '../../components/register/register';
export default function Login() {
	const [registerData, setRegisterData] = useState({
		email: '',
		password: '',
	});
	const [registershow, setRegistershow] = useState(true);
	const Register_Function = async () => {
		await LoginUser(registerData);
	};
	return (
		<div>
			<Toaster />
			{registershow === true && (
				<div className='flex gap-3 items-center justify-evenly w-[100vw] flex-wrap'>
					<Image src={ChayaTimeLogo} alt='Logo' />
					<div className='mt-8 space-y-6 w-[200px]'>
						<span className='block text-xl font-medium text-slate-700'>
							Register
						</span>
						<label className='block'>
							<span className='block mb-2 text-sm font-medium text-gray-900 '>
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
								className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
								placeholder='Email Address'
							/>
						</label>
						<label className='block'>
							<span className='block mb-2 text-sm font-medium text-gray-900'>
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
								className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
								placeholder='Shop Name'
							/>
						</label>
						<button
							className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-[3px]'
							onClick={Register_Function}>
							Login
						</button>
						<button
							className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-[3px]'
							onClick={() => setRegistershow(false)}>
							Register
						</button>
					</div>
				</div>
			)}
			{registershow === false && <Register />}
		</div>
	);
}
