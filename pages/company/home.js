import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar';
import {
	MapProductBill,
	TotalSalesData,
	PreviousDayData,
	TodaySales,
	TodayServiceData,
} from '../../components/data/config';
import ChartData from '../../components/ChartData';

export default function Home() {
	const [PieDataLables, setPieDataLables] = useState([]);
	const [PieDataBody, setPieDataBody] = useState([]);
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

	return (
		<div className='display-flex-row-padding-3'>
			<NavBar />
			<div className='contents-body'>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<p
						style={{
							fontFamily: 'Times New Roman',
							fontSize: '20px',
							fontWeight: 'bold',
							textAlign: 'center',
							color: '#004ff5',
						}}>
						Recent Bills
					</p>
					<ChartData PieDataLables={PieDataLables} PieDataBody={PieDataBody} />
					<div className='grid grid-cols-2 grid-row-2 gap-5 items-center m-[10px]'>
						<label className='block'>
							<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
								Total Sales
							</span>
							<span
								className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
								placeholder='Email Address'>
								{SalesData}
							</span>
						</label>
						<label className='block'>
							<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
								Yesterday Sales Total
							</span>
							<span
								className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
								placeholder='Email Address'>
								{YesterdaySales}
							</span>
						</label>
						<label className='block'>
							<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
								Today Service Total
							</span>
							<span
								className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
								placeholder='Email Address'>
								{TodayServiceData1}
							</span>
						</label>
						<label className='block'>
							<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
								Today Sales
							</span>
							<span
								className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
								placeholder='Email Address'>
								{TodaySalesTotal}
							</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
