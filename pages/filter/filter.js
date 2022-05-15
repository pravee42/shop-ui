import React, { useState } from 'react';
import CheckOutPrint from '../../components/checkout/checkoutui';
import NavBar from '../../components/navbar';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBillData, SearchBillTotal } from '../../components/data/config';

export default function FilterBill() {
	const [BillData, setBillData] = useState([]);
	const [BillNumber, setBillNumber] = useState(0);
	const [BillNumber1, setBillNumber1] = useState(0);
	const [BillTotal, setBillTotal] = useState(0);
	const [BillDate, setBillDate] = useState('');

	const changeState = async () => {
		const res = await SearchBillData(BillNumber);
		await setBillData(res);
		const bno = await res[0].bill_number;
		const billtotal = await SearchBillTotal(bno);
		await console.log(billtotal, 'bill total');
		await setBillTotal(billtotal[0]?.total_ammount);
		await setBillDate(billtotal[0]?.date);
		await setBillNumber1(billtotal[0]?.bill_number);
		// await setBillTotal(billtotal.total_ammount);
		// await setBillDate(billtotal.date);
		// await setBillNumber1(billtotal.bill_number);
	};
	const SearchBillFunction = async () => {
		toast.promise(changeState(), {
			loading: 'Loading Data.',
			success: <b>Data loaded successfully!</b>,
			error: <b>Failed to load data!</b>,
		});
	};
	return (
		<div className='d-flex flex-row'>
			<Toaster />
			<NavBar />
			<div className='d-flex align-items-center p-3 w-100 flex-column gap-3'>
				<div className='d-flex flex-row gap-3 p-2' style={{ height: 50 }}>
					<input
						type='text'
						placeholder='Enter Bill Number'
						className='border rounded p-3 text-primary bg-light'
						onChange={(e) => setBillNumber(e.target.value)}
					/>
					<button
						className='btn btn-outline-danger'
						onClick={SearchBillFunction}>
						Search
					</button>
				</div>
				<div className='h-100 d-flex w-100 align-items-center justify-content-center'>
					{BillNumber.length > 0 ? (
						<CheckOutPrint
							BillData={BillData}
							BillNumber={BillNumber1}
							Total={BillTotal}
							date={BillDate}
						/>
					) : (
						<p className='badge text-white p-3 bg-primary h-25 align-items-center d-flex'>
							Enter Bill Number
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
