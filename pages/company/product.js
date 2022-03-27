import React, { useEffect, useState } from 'react';
import { getProducts } from '../../components/data/config';
import { FaEdit } from 'react-icons/fa';
import { IoIosCreate } from 'react-icons/io';
import Link from 'next/link';
import NavBar from '../../components/navbar';
import UpdateProduct from '../../components/updateproduct';
import CreateProduct from './../../components/product/createproduct';

export default function Products() {
	const [Products, setProducts] = useState([]);
	const [updateProduct, setUpdateProduct] = useState(false);
	const [ProductId, setProductId] = useState('');

	useEffect(async () => {
		const data = await getProducts();
		await setProducts(data);
	}, []);

	const UpdateProductFunction = async (id) => {
		await setProductId(id);
		setUpdateProduct(!updateProduct);
	};

	return (
		<div className='display-flex-row-padding-3'>
			<NavBar />
			<div className='flex justify-center w-[100vw] flex-column p-3 gap-3 flex-wrap'>
				{updateProduct === false && (
					<div>
						<CreateProduct />
					</div>
				)}
				<div>
					{updateProduct === false && (
						<div className='flex-row justify-around items-center text-center p-[10px] w-100'>
							<h1 className='text-xl subpixel-antialiased italic font-semibold tracking-wide'>
								Products
							</h1>
							<div className='width50-table mt-10'>
								<table className='bg-white table-auto p-3 border-collapse border border-slate-500'>
									<thead className='table-header-group bg-green-500'>
										<tr className='table-row'>
											<th className='border-slate-700'>
												Name
											</th>
											<th className='border-slate-700'>
												Price
											</th>
											<th className='border-slate-700'>
												Quantity
											</th>
											<th className='border-slate-700'>
												Update
											</th>
										</tr>
									</thead>
									<tbody>
										{Products.map((data) => (
											<tr key={data.id}>
												<td className='border border-slate-700 table-cell p-3'>
													{data.product_name}
												</td>
												<td className='border border-slate-700 table-cell p-3'>
													{data.product_price}
												</td>
												<td className='border border-slate-700 table-cell p-3'>
													{data.product_qty}
												</td>
												<td className='border border-slate-700 table-cell p-3'>
													<button
														className='flex items-center justify-center h-full w-full rounded bg-indigo-500 text-white hover:bg-indigo-900'
														onClick={() =>
															UpdateProductFunction(
																data.id
															)
														}>
														Edit
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}
					{updateProduct === true && (
						<div>
							<UpdateProduct product_id={ProductId} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
