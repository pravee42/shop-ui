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
		await data.map((aa) => {
			labels.push(aa.title);
			body.push(aa.value);
		});
		await setPieDataLables(labels);
		await setPieDataBody(body);
	}, []);

	return (
		<div className='display-flex-row-padding-3'>
			<NavBar />
			<div className='contents-body'>
				<div className='flex-row items-center justify-center p-3'>
					<h3>Monthly Sales Report</h3>
					<ChartData PieDataLables={PieDataLables} PieDataBody={PieDataBody} />
				</div>
			</div>
		</div>
	);
}
