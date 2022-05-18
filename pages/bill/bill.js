import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
	SHOPEMAILID,
	TodayDate,
	getProducts,
	uuidv4,
	FilterBill,
	CreateBill,
	getProductDetail,
	Updateproduct,
} from "../../components/data/config";
import NavBar from "../../components/navbar";
import { Toaster } from "react-hot-toast";

export default function Bill() {
	const [BillNumber, setBillNumber] = useState("");
	const [Bill, setBill] = useState({
		shop_email: SHOPEMAILID,
		bill_number: uuidv4,
		date: TodayDate,
		product_id: 0,
		product_name: "",
		product_price: 0,
		product_qty: 0,
		product_gst: 0.0,
		total_price: 0,
	});
	const [products, setProducts] = useState([]);
	const [billList, setBillList] = useState([]);

	const UpdateProduct = async (selectedProduct) => {
		await setBill({
			...Bill,
			product_name: selectedProduct.product_name,
			product_id: selectedProduct.id,
			product_price: selectedProduct.product_price,
			product_gst: selectedProduct.product_gst,
		});
	};
	const qtyRef = useRef();
	const prodRef = useRef();

	const getBillDetails = async () => {
		setBillList([...billList, Bill]);
		await setBill({ ...Bill, product_name: " ", product_qty: 0 });
	};

	useEffect(async () => {
		const data = await getProducts();
		await setProducts(data);
	}, []);

	const changeProduct = async (e) => {
		let productData = await products.filter((data) =>
			data.id.toString().includes(e.target.value.toString())
		);
		await UpdateProduct(productData[0]);
		qtyRef.current && qtyRef.current.focus();
	};

	useEffect(async () => {
		await setBillNumber(uuidv4());
	}, []);

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
		};
		Updateproduct(data);
	};

	const SaveData = async (e) => {
		e.preventDefault();
		await CreateBill(Bill);
		await ReduceProductqty();
		await getBillDetails();
		prodRef.current && prodRef.current.focus();
	};

	return (
		<div className="d-flex h-100">
			<Toaster />
			<NavBar />
			<div className="d-flex flex-column gap-4">
				<form className="d-flex align-center flex-column gap-3 p-4">
					<div className="form-floating  w-25">
						<input
							type="text"
							className="form-control text-danger"
							placeholder="Bill Number"
							onChange={(e) => {
								setBill({
									...Bill,
									bill_number: e.target.value,
								});
							}}
							defaultValue={BillNumber}
						/>
						<label htmlFor="floatingInput">Bill Number</label>
					</div>
					<div className="d-flex flex-row gap-2 align-items-center justify-content-center">
						<div className="w-25 form-floating">
							<input
								className="form-control"
								list="datalistOptions"
								defaultValue={Bill.product_name}
								onBlur={changeProduct}
								ref={prodRef}
								placeholder="Search Product..."
							/>
							<datalist id="datalistOptions">
								<option value=" "></option>
								{products.map((data) => (
									<option key={data.id} value={data.id}>
										{data.product_name}
									</option>
								))}
							</datalist>
							<label htmlFor="floatingInput">
								Select Product
							</label>
						</div>
						<div className="form-floating  w-25">
							<input
								type="number"
								className="form-control "
								placeholder="Quantity"
								ref={qtyRef}
								value={Bill.product_qty}
								onFocus={(e) => e.target.select()}
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
												(parseInt(Bill.product_price) +
													gst)
										),
										bill_number: BillNumber,
									});
								}}
							/>
							<label htmlFor="floatingInput">Quantity</label>
						</div>
						<div className="form-floating  w-25">
							<input
								type="number"
								className="form-control"
								placeholder="Ammount"
								onChange={(e) =>
									setBill({
										...Bill,
										product_price: e.target.value,
										total_price: Math.round(
											parseInt(e.target.value) *
												parseInt(Bill.product_qty) +
												(parseInt(Bill.product_gst) *
													parseInt(e.target.value)) /
													100
										),
									})
								}
								value={Bill.product_price}
							/>
							<label htmlFor="floatingInput">Ammount</label>
						</div>
						<div className="form-floating  w-25">
							<input
								type="number"
								className="form-control"
								placeholder="total price"
								onChange={(e) =>
									setBill({
										...Bill,
										total_price: e.target.value,
									})
								}
								value={Bill.total_price}
							/>
							<label htmlFor="floatingInput">Total price</label>
						</div>

						<div className="d-flex flex-row gap-3">
							<button
								onClick={SaveData}
								className="btn btn-outline-primary"
							>
								<i className="bi bi-bag-plus"></i>
							</button>
						</div>
					</div>
				</form>
				<div className="d-flex w-100 flex-row align-center justify-content-center ">
					<table className="table table-stripped table-hover table-bordered w-50">
						<thead className="table-dark">
							<tr>
								<th>Product Name</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{billList.map((data) => (
								<tr key={data.id}>
									<td>{data.product_name}</td>
									<td>{data.total_price}</td>
								</tr>
							))}
							<tr>
								<td></td>
								<td>
									<Link href="/checkout/checkout">
										<button className="btn btn-outline-success">
											<i className="bi bi-bag-check"></i>{" "}
											Check Out
										</button>
									</Link>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
