import axios from "axios";
import toast from "react-hot-toast";
// const HOST = "http://localhost:8000";
const HOST = "https://shop-abipravi.herokuapp.com";

var SHOPEMAILID;
var TodayDate = new Date().toISOString().slice(0, 10);
var BillNumber1;
var AUTHKEY;

// if (process.browser) {
// 	AUTHKEY = sessionStorage.getItem('authkey')
// 		? sessionStorage.getItem('authkey')
// 		: 'f9261838f8e09be27c12ae8146c78eb89ff5b73c';
// 	SHOPEMAILID = localStorage.getItem('email')
// 		? localStorage.getItem('email')
// 		: 'shop@kumar.com';
// 	BillNumber1 = sessionStorage.getItem('billnumber');
// }
function callback() {
  if (process.browser) {
    AUTHKEY = localStorage.getItem("authkey")
      ? localStorage.getItem("authkey").toString()
      : "";
    SHOPEMAILID = localStorage.getItem("email")
      ? localStorage.getItem("email")
      : "";
    BillNumber1 = sessionStorage.getItem("billnumber");
  }
}

callback();

const getBillData = async () => {
  callback();
  const res = await axios.get(`${HOST}/shop/bill/${AUTHKEY}/`);
  const data = res.data;
  return data;
};

const MapProductBill = async () => {
  callback();
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
    bill.date.includes(TodayDate)
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
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

const TotalSalesData = async () => {
  callback();
  const BillData = await getBillData();
  let totalSales = 0;
  for (let i = 0; i < BillData.length; i++) {
    totalSales += BillData[i].total_price;
  }
  return totalSales;
};

const PreviousDayData = async () => {
  callback();
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
  callback();
  const res = await axios.get(`${HOST}/shop/servicetotal/${AUTHKEY}/`);
  const data = res.data;
  const TodayData = await data.filter(
    (data) => data.date === new Date().toISOString().slice(0, 10)
  );
  let totalSales = 0;
  for (let i = 0; i < TodayData.length; i++) {
    totalSales += TodayData[i].total_price;
  }
  return totalSales;
};

const getProducts = async () => {
  callback();
  const res = await axios.get(`${HOST}/shop/product/${AUTHKEY}/`);
  const data = res.data;
  return data;
};

const deleteProduct = async (id, fnc) => {
  callback();
  await axios.delete(`${HOST}/shop/product/detail/${AUTHKEY}/${id}/`).then(
    (res) => {
      toast.success("Product Deleted");
    },
    (err) => {
      toast.error("Error Deleting");
    }
  );
  fnc();
};

const Updateproduct = async (product_data) => {
  callback();
  await axios
    .put(
      `${HOST}/shop/product/detail/${AUTHKEY}/${product_data.id}/`,
      product_data
    )
    .then(
      (res) => {
        toast.success("Updated");
      },
      (err) => {
        toast.error("error");
      }
    );
};

const getProductDetail = async (product_id) => {
  callback();
  const res = await axios.get(
    `${HOST}/shop/product/detail/${AUTHKEY}/${product_id}/`
  );
  const data = res.data;
  return data;
};

const CreateProductData = async (product_data, req) => {
  callback();
  await console.log(product_data);
  await axios.post(`${HOST}/shop/product/${AUTHKEY}/`, product_data).then(
    async (res) => {
      await toast.success("Saved");
      req();
    },
    async (err) => {
      await toast.error("Error Occured While Saving");
    }
  );
  // window.location.reload();
};

const CreateBill = async (Bill) => {
  callback();
  await axios.post(`${HOST}/shop/bill/${AUTHKEY}/`, Bill).then(
    (res) => {
      toast.success("Added");
    },
    (err) => {
      toast.error("Error Adding Bill");
    }
  );
  if (process.browser) {
    await sessionStorage.setItem("billnumber", Bill.bill_number);
  }
};

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const FilterBill = async () => {
  callback();
  const data = await getBillData();
  const Bill = await data.filter((bill) =>
    bill.bill_number.includes(BillNumber1)
  );
  return Bill;
};

const UpdateBillTotal = async (BillData) => {
  callback();
  await axios.post(`${HOST}/shop/billtotal/${AUTHKEY}/`, BillData).then(
    (res) => {
      toast.success("Bill Created");
    },
    (err) => {
      toast.error("Error Creating Bill");
    }
  );
};

const getBillTotal = async () => {
  callback();
  const response = await axios.get(`${HOST}/billtotal/${AUTHKEY}`);
  const data = await response.data;
};

const MonthlyProfit = async () => {
  callback();
  var start = new Date();
  start.setDate(start.getDate() - 30);
  let end = new Date(TodayDate);
  const data = await getBillData();
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
  for (let i = 0; i < TodayBillData.length; i++) {
    let pushData = {
      date: TodayBillData[i].date,
      price: TodayBillData[i].total_price,
    };
    await sales.push(pushData);
  }

  let dateSales = [];
  var salesLength;
  salesLength = sales.length;
  let salesIncrementor = 0;

  for (salesIncrementor; salesIncrementor < salesLength; salesIncrementor++) {
    let date_sales = [];
    for (let j = 0; j < sales.length; j++) {
      if (
        sales[salesIncrementor].date.toString() === sales[j].date.toString()
      ) {
        await date_sales.push(sales[j]);
      }
    }
    if (date_sales.length > 0) {
      let sum = 0;
      for (let x = 0; x < date_sales.length; x++) {
        sum += date_sales[x].price;
      }
      let onjj = { date: date_sales[0].date, price: sum };
      await dateSales.push(onjj);
      sales = await sales.filter(
        (data) => !data.date.includes(date_sales[0].date)
      );

      salesIncrementor = 0;
    }
  }
  return dateSales;
};

const RegisterUser = async (UserData) => {
  // callback();
  await axios.post(`${HOST}/auth/register`, UserData).then(
    () => {
      toast.success("User Register Successfully");
      toast.success("login to use the app");
      sleep(3000).then(() => {
        window.location.reload();
      });
    },
    (err) => {
      toast.error("Error Occured");
    }
  );
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const LoginUser = async (UserData, hide) => {
  await axios.post(`${HOST}/auth/login`, UserData).then(
    (res) => {
      if (res.data === "Not Logged...") {
        toast.error("Email or Password Incorrect");
      } else {
        toast.success("Successfully logged in");
        if (process.browser) {
          localStorage.setItem("authkey", res.data.authKey);
          localStorage.setItem("email", res.data.user);
          hide();
        }
      }
    },
    (err) => {
      toast.error("Error Occured");
    }
  );
};

const TodaySales = async () => {
  callback();
  const res = await axios.get(`${HOST}/shop/billtotal/${AUTHKEY}/`);
  const data = res.data;
  const TodayData = await data.filter(
    (data) => data.date === new Date().toISOString().slice(0, 10)
  );
  let totalSales = 0;
  for (let i = 0; i < TodayData.length; i++) {
    totalSales += parseInt(TodayData[i].total_ammount);
  }
  return totalSales;
};

const SearchBillData = async (billno) => {
  callback();
  const data = await getBillData();
  const Bill = await data.filter((bill) => bill.bill_number.includes(billno));
  return Bill;
};

const SearchBillTotal = async (billno) => {
  callback();
  const res = await axios.get(`${HOST}/shop/billtotal/${AUTHKEY}/`);
  const data = res.data;
  const Bill = await data.filter((bill) => bill.bill_number.includes(billno));
  return Bill;
};

const lowStock = async () => {
  callback();
  const data = await getProducts();
  const lowStock = await data.filter((product) => product.product_qty < 5);
  return lowStock;
};

const filterBillbyDate = async (date1) => {
  callback();
  const response = await axios.get(`${HOST}/shop/billtotal/${AUTHKEY}/`);
  const bills = response.data;
  const Bill = await bills.filter((billsdata) => billsdata.date.includes(date1));
  return Bill
};

export {
  TodaySales,
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
  SearchBillData,
  AUTHKEY,
  RegisterUser,
  LoginUser,
  SearchBillTotal,
  lowStock,
  filterBillbyDate,
};
