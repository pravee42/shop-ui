import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '../../components/navbar';
import {
	MapProductBill,
	TotalSalesData,
	PreviousDayData,
	TodaySales,
	lowStock,
	TodayServiceData,
} from '../../components/data/config';
import ChartData from '../../components/ChartData';

export default function Home() {
	const [PieDataLables, setPieDataLables] = useState([]);
	const [PieDataBody, setPieDataBody] = useState([]);
	const [lowstock, setLowSotck] = useState([]);
	const [SalesData, setSalesData] = useState('');
	const [YesterdaySales, setYesterdaySales] = useState('');
	const [TodayServiceData1, setTodayServiceData] = useState('');
	const [TodaySalesTotal, setTodaySalesTotal] = useState('');

	useEffect(async () => {
		let data = await MapProductBill();
		let labels = [];
		let body = [];
		await data.map((aa) => {
			labels.push(aa.title);
			body.push(aa.value);
		});
		await setPieDataLables(labels);
		await setPieDataBody(body);
	}, []);

	useEffect(async () => {
		const data = await TotalSalesData();
		await setSalesData(data);
	}, []);

	useEffect(async () => {
		const data = await PreviousDayData();
		await setYesterdaySales(data);
	}, []);

	useEffect(async () => {
		const data = await TodayServiceData();
		await setTodayServiceData(data);
	}, []);

	useEffect(async () => {
		const data = await TodaySales();
		await setTodaySalesTotal(data);
	}, []);

	useEffect(async () => {
		const data = await lowStock();
		await setLowSotck(data);
	}, []);

	return (
		<div className='d-flex flex-row h-100'>
			<Toaster />
			<NavBar />
			<div className='container'>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<p className='text-primary h5'>Recent Bills</p>
					<ChartData PieDataLables={PieDataLables} PieDataBody={PieDataBody} />
					<div className='align-center d-flex flex-column justify-content-center mt-4'>
						<div className='d-flex flex-row w-100 gap-4'>
							<div className='d-flex flex-row gap-2 border p-2 rounded w-100'>
								<p className='h6'>Total Sales:</p>
								<p classname='badge bg-secondary text-dark'>{SalesData}</p>
							</div>
							<div className='d-flex flex-row gap-2 border p-2 rounded w-100'>
								<p className='h6'>Yesterday Sales Total:</p>
								<p classname='badge bg-secondary text-dark'>{YesterdaySales}</p>
							</div>
						</div>
						<div className='d-flex flex-row w-100 gap-4 mt-4'>
							<div className='d-flex flex-row gap-2 border p-2 rounded w-100'>
								<p className='h6'>Today Service Total:</p>
								<p classname='badge bg-secondary text-dark'>
									{TodayServiceData1}
								</p>
							</div>
							<div className='d-flex flex-row gap-2 border p-2 rounded w-100'>
								<p className='h6'>Today Sales:</p>
								<p classname='badge bg-secondary text-dark'>
									{TodaySalesTotal}
								</p>
							</div>
						</div>
					</div>
					<p className='h5 text-danger mt-4'>Low Stock</p>
					<div className='d-flex flex-row justify-content-center align-center'>
						<div className='flex flex-col'>
							<div className='w-full'>
								<div className='border p-2'>
									<table className='table bordered table-striped'>
										<thead className='table-dark'>
											<tr>
												<th className='px-6 py-2 text-2sm text-slate-700'>
													Product
												</th>
												<th className='px-6 py-2 text-2sm text-slate-700'>
													Quantity
												</th>
												<th className='px-6 py-2 text-2sm text-slate-700'>
													Price
												</th>
											</tr>
										</thead>
										<tbody className='bg-white divide-y divide-gray-300'>
											{lowstock.length > 0 ? (
												lowstock.map((stockdata) => (
													<tr className='whitespace-nowrap' key={stockdata.id}>
														<td className='px-6 py-4 text-sm text-slate-700'>
															{stockdata.product_name}
														</td>
														<td className='px-6 py-4'>
															<div className='text-sm text-gray-900'>
																{stockdata.product_qty}
															</div>
														</td>
														<td className='px-6 py-4'>
															<div className='text-sm text-slate-700'>
																{stockdata.product_price}
															</div>
														</td>
													</tr>
												))
											) : (
												<tr className='whitespace-nowrap'>No Low Stock Data</tr>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
