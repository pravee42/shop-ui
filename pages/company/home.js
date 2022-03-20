import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar';
import {
	MapProductBill,
	TotalSalesData,
	PreviousDayData,
	TodayServiceData,
} from '../../components/data/config';
import ChartData from '../../components/ChartData';

export default function Home() {
	const [PieDataLables, setPieDataLables] = useState([]);
	const [PieDataBody, setPieDataBody] = useState([]);
	const [SalesData, setSalesData] = useState('');
	const [YesterdaySales, setYesterdaySales] = useState('');
	const [TodayServiceData1, setTodayServiceData] = useState('');

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
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							alignItems: 'center',
						}}>
						<div className='sales-service-data'>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}>
								<p style={{ height: 1 }}>Total Sales</p>
								<p
									style={{
										backgroundColor: '#CDCCDE',
										padding: 5,
										borderRadius: 5,
										textAlign: 'left',
									}}>
									{SalesData}
								</p>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}>
								<p style={{ height: 1 }}>Yesterday Sales</p>
								<p
									style={{
										backgroundColor: '#CDCCDE',
										padding: 5,
										borderRadius: 5,
										textAlign: 'left',
									}}>
									{YesterdaySales}
								</p>
							</div>
						</div>
						<div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}>
								<p style={{ height: 1 }}>Today Services</p>
								<p
									style={{
										backgroundColor: '#CDCCDE',
										padding: 5,
										borderRadius: 5,
										textAlign: 'left',
									}}>
									{TodayServiceData1}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
