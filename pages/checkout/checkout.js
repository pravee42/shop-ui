import React, { useEffect, useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import CheckOutPrint from '../../components/checkout/checkoutui';
import {
	FilterBill,
	SHOPEMAILID,
	BillNumber1,
	UpdateBillTotal,
	TodayDate,
} from '../../components/data/config';
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '../../components/navbar';

export default function CheckOut() {
	const [BillNumber, setBillNumber] = useState('');
	const [BillData, setBillData] = useState([]);
	const [Total, setTotal] = useState(0);
	const [TotalGST, setTotalGST] = useState(0);
	const componentRef = useRef();

	window.location.reload();
	useEffect(async () => {
		if (process.browser) {
			await setBillNumber(sessionStorage.getItem('billnumber'));
		}
	}, []);
	const setBill = async () => {
		const BillData = await FilterBill();
		const FilterData = await BillData.filter((data) =>
			data.bill_number.includes(BillNumber),
		);
		await setBillData(FilterData);
	};
	useEffect(async () => {
		toast.promise(setBill(), {
			loading: 'Loading Data...',
			success: <b>Data loaded successfully!</b>,
			error: <b>Failed To Load!.</b>,
		});
	}, []);
	const BillTotal = async () => {
		let total = 0;
		for (let i = 0; i < BillData.length; i++) {
			total += BillData[i].total_price;
		}
		await setTotal(total);
	};
	const GSTTotal = async () => {
		let total = 0;
		for (let i = 0; i < BillData.length; i++) {
			total += BillData[i].product_gst;
		}
		await setTotalGST(total);
	};
	const CheckOutFunction = async () => {
		let data = await {
			shop_email: SHOPEMAILID,
			bill_number: BillNumber1,
			date: TodayDate,
			total_ammount: Total,
		};
		await UpdateBillTotal(data);
	};
	useEffect(() => {
		BillTotal();
		GSTTotal();
	});
	return (
		<div className='display-flex-row-padding-3'>
			<Toaster />
			<NavBar />
			<div className='contents-body'>
				<CheckOutPrint
					ref={componentRef}
					BillData={BillData}
					BillNumber={BillNumber}
					Total={Total}
					TotalGST={TotalGST}
					date={TodayDate}
				/>
				<ReactToPrint
					trigger={() => (
						<button className='w-[100px] bg-indigo-500 hover:bg-indigo-700 text-white rounded p-3'>
							Print Bill
						</button>
					)}
					onAfterPrint={CheckOutFunction}
					content={() => componentRef.current}
				/>
				<button
					className='w-[100px] bg-indigo-500 hover:bg-indigo-700 text-white rounded p-3 m-2'
					onClick={CheckOutFunction}>
					Check Out
				</button>
			</div>
		</div>
	);
}
