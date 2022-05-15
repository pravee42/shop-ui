import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import ChayaTimeLogo from '../../assests/download.png';
import { LoginUser } from '../../components/data/config';
import Register from '../../components/register/register';

export default function Login(props) {
	const [registerData, setRegisterData] = useState({
		email: '',
		password: '',
	});
	const [registershow, setRegistershow] = useState(true);
	const [loading, setLoading] = useState(false);
	const Register_Function = async () => {
		await setLoading(true);
		await LoginUser(registerData, props.authcheck);
		await setLoading(false);
	};

	function hideRegister() {
		setRegistershow(true);
	}

	return (
		<>
			<Toaster />
			{registershow === true && (
				<div
					className='d-flex justify-content-evenly flex-row align-items-center gap-3 '
					style={{ width: '100vw' }}>
					<Image src={ChayaTimeLogo} alt='Logo' />
					<div className='mt-4 d-flex flex-column gap-3 h-50'>
						<input
							onChange={(e) =>
								setRegisterData({
									...registerData,
									email: e.target.value,
								})
							}
							type='email'
							className='form-control'
							placeholder='Email Address'
						/>
						<input
							onChange={(e) =>
								setRegisterData({
									...registerData,
									password: e.target.value,
								})
							}
							type='password'
							className='form-control'
							placeholder='Shop Name'
						/>

						<button
							className='border border-primary rounded bg-light text-primary p-2'
							onClick={Register_Function}>
							{loading === true ? 'Loading' : 'Login'}
						</button>
						<button
							className='btn btn-primary'
							onClick={() => setRegistershow(false)}>
							Register
						</button>
					</div>
				</div>
			)}
			{registershow === false && <Register hidefnc={hideRegister} />}
		</>
	);
}
