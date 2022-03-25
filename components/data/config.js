import axios from 'axios';

const HOST = 'https://shop-abipravi.herokuapp.com';

let AUTHKEY;
let SHOPEMAILID;
let TodayDate = new Date().toISOString().slice(0, 10);
console.log(TodayDate);
let BillNumber1;

if (process.browser) {
	AUTHKEY = sessionStorage.getItem('authkey')
		? sessionStorage.getItem('authkey')
		: 'de65dd09309fe2a4b9a87febc3633d6590addf77';
	SHOPEMAILID = localStorage.getItem('email')
		? localStorage.getItem('email')
		: 'darkparadise877@gmail.com';
	BillNumber1 = sessionStorage.getItem('billnumber');
}

const getBillData = async () => {
	const res = await axios.get(`${HOST}/shop/bill/${AUTHKEY}/`);
	const data = res.data;
	return data;
};

const MapProductBill = async () => {
	const res = await axios.get(`${HOST}/shop/product/${AUTHKEY}/`);
	const data = res.data;
	let products = [];
	let pid = [];
	await data.map((uu) => {
		products.push(uu.product_name);
		pid.push(uu.id);
	});
	let sales = [];
	const BillData = await getBillData();
	const TodayBillData = await BillData.filter((bill) =>
		bill.date.includes(TodayDate),
	);
	for (let i = 0; i < pid.length; i++) {
		let prd = 0;
		for (let j = 0; j < TodayBillData.length; j++) {
			if (TodayBillData[j].product_id === pid[i]) {
				prd += parseInt(TodayBillData[j].product_qty);
			}
		}
		if (prd > 0) {
			let pushData = { title: products[i], value: prd };
			sales.push(pushData);
		}
	}
	return sales;
};

const colorArray = [
	'#00B3E6',
	'#E6B333',
	'#3366E6',
	'#999966',
	'#99FF99',
	'#B34D4D',
	'#80B300',
	'#809900',
	'#E6B3B3',
	'#6680B3',
	'#66991A',
	'#FF99E6',
	'#CCFF1A',
	'#FF1A66',
	'#E6331A',
	'#33FFCC',
	'#66994D',
	'#B366CC',
	'#4D8000',
	'#B33300',
	'#CC80CC',
	'#66664D',
	'#991AFF',
	'#E666FF',
	'#4DB3FF',
	'#1AB399',
	'#E666B3',
	'#33991A',
	'#CC9999',
	'#B3B31A',
	'#00E680',
	'#4D8066',
	'#809980',
	'#E6FF80',
	'#1AFF33',
	'#999933',
	'#FF3380',
	'#CCCC00',
	'#66E64D',
	'#4D80CC',
	'#9900B3',
	'#E64D66',
	'#4DB380',
	'#FF4D4D',
	'#99E6E6',
	'#6666FF',
];

const TotalSalesData = async () => {
	const BillData = await getBillData();
	let totalSales = 0;
	for (let i = 0; i < BillData.length; i++) {
		totalSales += BillData[i].total_price;
	}
	return totalSales;
};

const PreviousDayData = async () => {
	var d = new Date();
	d.setDate(d.getDate() - 1);
	var dd = new Date(d).toISOString().slice(0, 10);
	const BillData = await getBillData();
	const YesterdayBillData = BillData.filter((bill) => bill.date === dd);
	let totalSales = 0;
	for (let i = 0; i < YesterdayBillData.length; i++) {
		totalSales += YesterdayBillData[i].total_price;
	}
	return totalSales;
};

const TodayServiceData = async () => {
	const res = await axios.get(`${HOST}/shop/servicetotal/${AUTHKEY}/`);
	const data = res.data;
	const TodayData = await data.filter(
		(data) => data.date === new Date().toISOString().slice(0, 10),
	);
	let totalSales = 0;
	for (let i = 0; i < TodayData.length; i++) {
		totalSales += TodayData[i].total_price;
	}
	return totalSales;
};

const getProducts = async () => {
	const res = await axios.get(`${HOST}/shop/product/${AUTHKEY}/`);
	const data = res.data;
	return data;
};

const deleteProduct = async (id) => {
	await axios.delete(`${HOST}/shop/product/detail/${AUTHKEY}/${id}/`).then(
		(res) => {
			alert('Deleted');
		},
		(err) => {
			alert('Error Deleting');
		},
	);
	window.location.reload();
};

const Updateproduct = async (product_data) => {
	await axios
		.put(
			`${HOST}/shop/product/detail/${AUTHKEY}/${product_data.id}/`,
			product_data,
		)
		.then(
			(res) => {
				alert('Updated');
			},
			(err) => {
				alert('error');
			},
		);
};

const getProductDetail = async (product_id) => {
	const res = await axios.get(
		`${HOST}/shop/product/detail/${AUTHKEY}/${product_id}/`,
	);
	const data = res.data;
	return data;
};

const CreateProductData = async (product_data) => {
	await console.log(product_data);
	await axios.post(`${HOST}/shop/product/${AUTHKEY}/`, product_data).then(
		(res) => {
			alert('Saved');
		},
		(err) => {
			alert('Error Occured While Saving');
		},
	);
	window.location.reload();
};

const CreateBill = async (Bill) => {
	await axios.post(`${HOST}/shop/bill/${AUTHKEY}/`, Bill).then(
		(res) => {
			alert('Added');
		},
		(err) => {
			alert('Error Adding Bill');
		},
	);
	if (process.browser) {
		await sessionStorage.setItem('billnumber', Bill.bill_number);
	}
};

function uuidv4() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16),
	);
}

const FilterBill = async () => {
	const data = await getBillData();
	const Bill = await data.filter((bill) =>
		bill.bill_number.includes(BillNumber1),
	);
	return Bill;
};

const UpdateBillTotal = async (BillData) => {
	console.log(BillData);
	await axios.post(`${HOST}/shop/billtotal/${AUTHKEY}/`, BillData).then(
		(res) => {
			alert('Bill Created');
		},
		(err) => {
			alert('Error Creating Bill');
		},
	);
};

const MonthlyProfit = async () => {
	var start = new Date();
	start.setDate(start.getDate() - 30);
	console.log(start.toISOString().slice(0, 10));
	let end = new Date(TodayDate);
	const res = await axios.get(`${HOST}/shop/product/${AUTHKEY}/`);
	const data = res.data;
	let products = [];
	let pid = [];
	await data.map((uu) => {
		products.push(uu.product_name);
		pid.push(uu.id);
	});
	let sales = [];
	const BillData = await getBillData();
	const TodayBillData = await BillData.filter((bill) => {
		var date = new Date(bill.date);
		return date >= start && date <= end;
	});
	for (let i = 0; i < pid.length; i++) {
		let prd = 0;
		for (let j = 0; j < TodayBillData.length; j++) {
			if (TodayBillData[j].product_id === pid[i]) {
				prd += parseInt(TodayBillData[j].product_qty);
			}
		}
		if (prd > 0) {
			let pushData = { title: products[i], value: prd };
			sales.push(pushData);
		}
	}
	await console.log(sales);
	return sales;
};

export {
	getBillData,
	MapProductBill,
	colorArray,
	TotalSalesData,
	PreviousDayData,
	TodayServiceData,
	getProducts,
	getProductDetail,
	Updateproduct,
	deleteProduct,
	SHOPEMAILID,
	CreateProductData,
	TodayDate,
	uuidv4,
	CreateBill,
	FilterBill,
	BillNumber1,
	UpdateBillTotal,
	MonthlyProfit,
};
