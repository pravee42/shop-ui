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

if (process.browser) {
	var BillNumber = sessionStorage.getItem('billnumber');
}

export default function CheckOut() {
	const [BillData, setBillData] = useState([]);
	const [Total, setTotal] = useState(0);
	const [TotalGST, setTotalGST] = useState(0);
	const componentRef = useRef();

	useEffect(() => {
		// window.location.reload();
	}, [BillNumber]);

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
	useEffect(async () => {
		await setBill();
		await BillTotal();
		await GSTTotal();
	}, []);
	return (
		<div className='d-flex flex-row justify-content-center align-items-center'>
			<Toaster />
			<NavBar />
			<div className='container'>
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
						<button className='btn btn-outline-danger'>Print Bill</button>
					)}
					onAfterPrint={CheckOutFunction}
					content={() => componentRef.current}
				/>
				<button
					className='btn btn-outline-danger m-2'
					onClick={CheckOutFunction}>
					Check Out
				</button>
				<button
					className='btn btn-outline-danger m-2'
					onClick={(_) => window.location.reload()}>
					Refresh
				</button>
			</div>
		</div>
	);
}
