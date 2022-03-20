import React from 'react';
import Image from 'next/image';
import ChayaTimeLogo from '../../assests/download.png';

export default class CheckOutPrint extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<div
					style={{
						display: 'flex',
						fontWeight: 'bold',
						// height: 60,
						justifyContent: 'center',
						flexDirection: 'column',
						alignItems: 'center',
						padding: 16,
					}}>
					<Image src={ChayaTimeLogo} alt={'Logo'} />
					<p>Invoice Date: {this.props.date}</p>
				</div>
				<div></div>
				<div className='flex justify-center'>
					<table className='table-auto border-collapse border border-slate-700'>
						<thead className='table-header-group bg-zinc-700'>
							<tr>
								<th className='text-slate-50 border border-slate-700'>
									Product Name
								</th>
								<th className='text-slate-50 border border-slate-700'>Price</th>
								<th className='text-slate-50 border border-slate-700'>
									Quantity
								</th>
								<th className='text-slate-50 border border-slate-700'>GST</th>
								<th className='text-slate-50 border border-slate-700'>Total</th>
							</tr>
						</thead>
						<tbody>
							{this.props.BillData.map((bill) => (
								<tr key={bill.id} className='odd:bg-gray-100'>
									<td className='border border-slate-700 p-3'>
										{bill.product_name}
									</td>
									<td className='border border-slate-700 p-3'>
										{bill.product_price}
									</td>
									<td className='border border-slate-700 p-3'>
										{bill.product_qty}
									</td>
									<td className='border border-slate-700 p-3'>
										{bill.product_gst} %
									</td>
									<td className='border border-slate-700 p-3'>
										{bill.total_price}
									</td>
								</tr>
							))}
							<tr style={{ color: 'black' }}>
								<td></td>
								<td></td>
								<td></td>
								<td
									className='border border-slate-700 p-3'
									style={{ color: 'black' }}>
									SubTotal:{' '}
								</td>
								<td
									className='border border-slate-700 p-3'
									style={{ color: 'black' }}>
									{this.props.Total}
								</td>
							</tr>
							<tr style={{ color: 'black' }}>
								<td colspan='3' className='border border-slate-700 p-3'>
									<p className='text-xs w-[200px]'>
										Bill Number: <span>{this.props.BillNumber}</span>
									</p>
								</td>
								<td
									className='border border-slate-700 p-3'
									style={{ color: 'black' }}>
									Due Ammount:{' '}
								</td>
								<td
									className='border border-slate-700 p-3'
									style={{ color: 'black' }}>
									{this.props.Total}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
