import React, { useState } from 'react';
import CheckOutPrint from '../../components/checkout/checkoutui';
import NavBar from '../../components/navbar';
import { SearchBillData, SearchBillTotal } from '../../components/data/config';

export default function FilterBill() {
	const [BillData, setBillData] = useState([]);
	const [BillNumber, setBillNumber] = useState(0);
	const [BillNumber1, setBillNumber1] = useState(0);
	const [BillTotal, setBillTotal] = useState(0);
	const [BillDate, setBillDate] = useState('');
	const SearchBillFunction = async () => {
		const res = await SearchBillData(BillNumber);
		await setBillData(res);
		const bno = await res[0].bill_number;
		const billtotal = await SearchBillTotal(bno);
		console.log(billtotal);
		await setBillTotal(billtotal[0].total_ammount);
		await setBillDate(billtotal[0].date);
		await setBillNumber1(billtotal[0].bill_number);
	};
	return (
		<div className='display-flex-row-padding-3 '>
			<NavBar />
			<div className='contents-body p-3 items-center'>
				<div className='grid grid-cols-2 p-3 gap-3'>
					<input
						type='text'
						placeholder='Bill Number'
						className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1 w-full '
						onChange={(e) => setBillNumber(e.target.value)}
					/>
					<button
						className='px-3 py-2 bg-white border shadow-sm border-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[100px] rounded-md sm:text-sm focus:ring-1'
						onClick={SearchBillFunction}>
						Search
					</button>
				</div>
				<div className='h-[500px] overflow-scroll'>
					{BillNumber1.length > 0 ? (
						<CheckOutPrint
							BillData={BillData}
							BillNumber={BillNumber1}
							Total={BillTotal}
							date={BillDate}
						/>
					) : (
						<p className='text-xl text-[black]'>Enter Bill Number</p>
					)}
				</div>
			</div>
		</div>
	);
}
