import react, { useState } from 'react';
import { CreateProductData, SHOPEMAILID, TodayDate } from '../data/config';
import NavBar from '../navbar';

export default function CreateProduct() {
	const [productData, setProductData] = useState({
		shop_email: SHOPEMAILID,
		product_name: '',
		date: TodayDate.toString(),
		product_price: 0,
		product_qty: 0,
		product_gst: 0,
		total_price: 0,
	});

	const ChangeData = async () => {
		await CreateProductData(productData);
	};

	return (
		<div className='grid grid-rows-4 gap-3 position-relative'>
			<span className='after:text-red-500 block text-lg font-medium text-slate-700'>
				Create Product
			</span>
			<label className='block'>
				<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
					Product Name
				</span>
				<input
					type='text'
					onChange={(e) =>
						setProductData({ ...productData, product_name: e.target.value })
					}
					className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
					value={productData.product_name}
					placeholder='Product Name'
				/>
			</label>
			<label className='block'>
				<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
					Quantity
				</span>
				<input
					type='number'
					onChange={(e) =>
						setProductData({
							...productData,
							product_qty: e.target.value,
							total_price:
								parseInt(e.target.value) * parseInt(productData.product_price),
						})
					}
					className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
					value={productData.product_qty}
					placeholder='Quantity'
				/>
			</label>
			<label className='block'>
				<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
					GST
				</span>
				<input
					type='number'
					onChange={(e) =>
						setProductData({
							...productData,
							product_gst: parseInt(e.target.value),
						})
					}
					className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
					value={productData.product_gst}
					placeholder='GST'
				/>
			</label>
			<label className='block'>
				<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
					Unit Price
				</span>
				<input
					type='number'
					className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
					onChange={(e) =>
						setProductData({
							...productData,
							product_price: e.target.value,
							total_price:
								parseInt(productData.product_qty) * parseInt(e.target.value),
						})
					}
					value={productData.product_price}
					placeholder='Price'
				/>
			</label>
			<label className='block'>
				<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
					Total Price
				</span>

				<input
					type='number'
					className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
					onChange={(e) =>
						setProductData({
							...productData,
							total_price: e.target.value,
						})
					}
					value={productData.total_price}
					placeholder='Total'
				/>
			</label>

			<button
				onClick={ChangeData}
				className='bg-indigo-500 p-3 w-full rounded text-white hover:bg-indigo-700 focus:shadow-lg'>
				Save
			</button>
		</div>
	);
}
