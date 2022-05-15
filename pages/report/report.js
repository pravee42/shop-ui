import React, { useState, useEffect } from 'react';
import ChartData from '../../components/ChartData';
import { MonthlyProfit } from '../../components/data/config';
import NavBar from '../../components/navbar';

export default function Reports() {
	const [PieDataLables, setPieDataLables] = useState([]);
	const [PieDataBody, setPieDataBody] = useState([]);
	useEffect(async () => {
		let data = await MonthlyProfit();
		let labels = [];
		let body = [];
		await data.map(async (aa) => {
			await labels.push(aa.date);
			await body.push(aa.price);
		});
		await setPieDataLables(labels);
		await setPieDataBody(body);
	}, []);

	return (
		<div className='display-flex-row-padding-3'>
			<NavBar />
			<div className='contents-body'>
				<div className='flex-row items-center justify-center p-3' style={{width: 'auto'}}>
					<h3>Monthly Sales Report</h3>
					<ChartData PieDataLables={PieDataLables} PieDataBody={PieDataBody} />
				</div>
				<div>
					<h3>Filter Bill By Date</h3>
				</div>
			</div>
		</div>
	);
}
