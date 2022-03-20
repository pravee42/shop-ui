import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { colorArray } from './data/config';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartData({ PieDataLables, PieDataBody }) {
	const Data = {
		labels: PieDataLables,
		datasets: [
			{
				data: PieDataBody,
				backgroundColor: colorArray,
				borderColor: colorArray,
				borderWidth: 1,
			},
		],
	};
	return (
		<div className='pie-chart'>
			{PieDataLables.length > 0 ? (
				<Pie data={Data} />
			) : (
				<p>No Recent Sales Avilable</p>
			)}
		</div>
	);
}
