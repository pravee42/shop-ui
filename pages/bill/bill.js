import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
	SHOPEMAILID,
	TodayDate,
	getProducts,
	uuidv4,
	CreateBill,
	FilterBill,
	getProductDetail,
	Updateproduct,
} from '../../components/data/config';
import NavBar from '../../components/navbar';
import { Toaster } from 'react-hot-toast';

export default function Bill() {
	const [BillNumber, setBillNumber] = useState('');
	const [Bill, setBill] = useState({
		shop_email: SHOPEMAILID,
		bill_number: uuidv4,
		date: TodayDate,
		product_id: 0,
		product_name: '',
		product_price: 0,
		product_qty: 0,
		product_gst: 0.0,
		total_price: 0,
	});
	const [products, setProducts] = useState([]);

	useEffect(async () => {
		const data = await getProducts();
		await setProducts(data);
	}, []);

	const changeProduct = async (e) => {
		let productData = await products.filter((data) =>
			data.id.toString().includes(e.target.value.toString()),
		);
		await UpdateProduct(productData[0]);
	};

	useEffect(async () => {
		await setBillNumber(uuidv4());
	}, []);

	const UpdateProduct = async (selectedProduct) => {
		await setBill({
			...Bill,
			product_name: selectedProduct.product_name,
			product_id: selectedProduct.id,
			product_price: selectedProduct.product_price,
			product_gst: selectedProduct.product_gst,
		});
	};

	const ReduceProductqty = async () => {
		let getProduct = await getProductDetail(Bill.product_id);
		let data = await {
			id: getProduct.id,
			shop_email: getProduct.shop_email,
			product_name: getProduct.product_name,
			date: getProduct.date,
			product_price: getProduct.product_price,
			product_qty: getProduct.product_qty - parseInt(Bill.product_qty),
			product_gst: getProduct.product_gst,
			product_gst: getProduct.product_gst,
		};
		Updateproduct(data);
	};

	const SaveData = async () => {
		await CreateBill(Bill);
		await ReduceProductqty();
	};

	return (
		<div className='display-flex-row-padding-3'>
			<Toaster />
			<NavBar />
			<div className='contents-body flex flex-wrap'>
				<div className='grid grid-cols-2 gap-5 items-center'>
					<div className='grid grid-rows-4 gap-3'>
						<p className='after:ml-0.5 after:text-red-500 block text-xl font-medium text-slate-700'>
							Bill
						</p>
						<label className='block'>
							<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
								Bill Number
							</span>
							<input
								type='text'
								className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
								placeholder='Bill Number'
								value={BillNumber}
							/>
						</label>
						<label className='block'>
							<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
								Item
							</span>
							<select
								onChange={changeProduct}
								className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'>
								<option>Select Menu</option>
								{products.map((data) => (
									<option key={data.id} value={data.id}>
										{data.product_name}
									</option>
								))}
							</select>
						</label>
						<label className='block'>
							<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
								Quantity
							</span>
							<input
								type='number'
								className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
								placeholder='Quantity'
								onChange={(e) => {
									let gst =
										(parseInt(Bill.product_price) *
											parseInt(Bill.product_gst)) /
										100;
									setBill({
										...Bill,
										product_qty: parseInt(e.target.value),
										total_price: Math.round(
											parseInt(e.target.value) *
												(parseInt(Bill.product_price) + gst),
										),
										bill_number: BillNumber,
									});
								}}
							/>
						</label>
						<label className='block'>
							<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
								Ammount
							</span>
							<input
								type='number'
								className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
								placeholder='Ammount'
								onChange={(e) =>
									setBill({ ...Bill, product_price: e.target.value })
								}
								value={Bill.product_price}
							/>
						</label>
						<label className='block'>
							<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
								Total price
							</span>
							<input
								type='number'
								className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
								placeholder='total price'
								onChange={(e) =>
									setBill({ ...Bill, total_price: e.target.value })
								}
								value={Bill.total_price}
							/>
						</label>

						<div className='grid grid-cols-2 gap-3'>
							<button
								onClick={SaveData}
								className='bg-indigo-500 p-3 w-full rounded text-white hover:bg-indigo-700 focus:shadow-lg'>
								Add Bill
							</button>
							<Link
								href='/checkout/checkout'
								className='bg-indigo-500 p-3 w-full rounded text-white hover:bg-indigo-700 focus:shadow-lg'>
								✅ Check Out
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
