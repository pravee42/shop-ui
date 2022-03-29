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
			<div className='flex justify-center laptop:w-full flex-column p-5 gap-3 flex-wrap'>
				{updateProduct === false && (
					<div>
						<CreateProduct />
					</div>
				)}
				<div>
					{updateProduct === false && (
						<div className='flex-row justify-around items-center text-center p-[10px] w-full'>
							<h1 className='text-xl subpixel-antialiased italic font-semibold tracking-wide'>
								Products
							</h1>
							<div className='container flex justify-center mx-auto  laptop:w-[50vw] md:shrink-0'>
								<div className='flex flex-col'>
									<div className='laptop:w-full '>
										<div className='border-b border-gray-200 shadow'>
											<table className='divide-y divide-gray-300 tablet:w-full table-auto tablet:w-xl'>
												<thead className='bg-gray-50'>
													<tr>
														<th className='px-6 py-2 text-2sm text-slate-700'>
															Name
														</th>
														<th className='px-6 py-2 text-2sm text-slate-700'>
															Price
														</th>
														<th className='px-6 tablet:hidden py-2 text-2sm text-slate-700'>
															Quantity
														</th>
														<th className='px-6 py-2 text-2sm text-slate-700'>
															Update
														</th>
													</tr>
												</thead>
												<tbody className='bg-white divide-y divide-gray-300'>
													{Products.map((data) => (
														<tr key={data.id} className='whitespace-nowrap'>
															<td className='px-6 py-4 text-sm text-slate-700'>
																{data.product_name}
															</td>
															<td className='px-6 py-4 text-sm text-slate-700'>
																{data.product_price}
															</td>
															<td className='px-6 py-4 text-sm text-slate-700'>
																{data.product_qty}
															</td>
															<td className='px-6 py-4 text-sm text-slate-700'>
																<button
																	className='flex items-center justify-center h-full w-full rounded bg-indigo-500 text-white hover:bg-indigo-900'
																	onClick={() =>
																		UpdateProductFunction(data.id)
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
								</div>
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
