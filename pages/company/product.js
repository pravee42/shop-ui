import React, { useEffect, useState } from 'react';
import { getProducts } from '../../components/data/config';
import NavBar from '../../components/navbar';
import UpdateProduct from '../../components/updateproduct';
import CreateProduct from './../../components/product/createproduct';

export default function Products() {
	const [Products, setProducts] = useState([]);
	const [updateProduct, setUpdateProduct] = useState(false);
	const [ProductId, setProductId] = useState('');
	const [loading, setLoading] = useState(false);

	const getProd = async () => {
		await setLoading(true);
		const data = await getProducts();
		await setProducts(data);
		await setLoading(false);
	};

	useEffect(() => {
		getProd();
	}, []);

	const handleProductUpdate = () => {
		setUpdateProduct(!updateProduct);
		getProd();
	};

	const UpdateProductFunction = async (id) => {
		await setProductId(id);
		handleProductUpdate();
	};

	return (
		<div
			className='d-flex flex-row'
			style={{ height: '100vh', overflow: 'hidden' }}>
			<NavBar />
			{loading === false ? (
				<div className='d-flex flex-row align-center justify-content-center w-100 gap-4 m-4 p-4'>
					{updateProduct === false && (
						<div>
							<CreateProduct getreq={getProd} />
						</div>
					)}
					<div style={{ height: '90vh', overflowY: 'scroll' }} className='w-50'>
						{updateProduct === false && (
							<div className='d-flex flex-column justify-content-center p-2 gap-3'>
								<h1 className='text-primary h5'>Products</h1>
								<table className='table table-stripped table-bordered'>
									<thead className='table-dark'>
										<tr>
											<th className='text-white h6'>Name</th>
											<th className='text-white h6'>Price</th>
											<th className='text-white h6'>Quantity</th>
											<th className='text-white h6'>Update</th>
										</tr>
									</thead>
									<tbody>
										{Products.map((data) => (
											<tr key={data.id}>
												<td>{data.product_name}</td>
												<td>{data.product_price}</td>
												<td>{data.product_qty}</td>
												<td>
													<button
														className='btn btn-outline-dark'
														onClick={() => UpdateProductFunction(data.id)}>
														Edit
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
						{updateProduct === true && (
							<div>
								<UpdateProduct
									product_id={ProductId}
									fnc={handleProductUpdate}
								/>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className='position-absolute top-50 start-50 translate-middle'>
					<div className='spinner-border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			)}
		</div>
	);
}
