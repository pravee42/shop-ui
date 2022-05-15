import React from "react";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import ChayaTimeLogo from "../../assests/download.png";

export default class CheckOutPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Toaster />
        <div className="d-flex flex-row justify-content-center">
          <Image src={ChayaTimeLogo} alt={"Logo"} />
        </div>
        <div>
          <p className="h5 text-primary">Invoice Date: {this.props.date}</p>
        </div>
        <div className="d-flex justify-content-center w-100 mt-2">
          <table className="table table-bordered table-stripped table-hover ">
            <thead className="table-dark">
              <tr>
                <th className="text-white h6">Product Name</th>
                <th className="text-white h6">Price</th>
                <th className="text-white h6">Quantity</th>
                <th className="text-white h6">GST</th>
                <th className="text-white h6">Total</th>
              </tr>
            </thead>
            <tbody>
              {this.props.BillData.map((bill) => (
                <tr key={bill.id} className="">
                  <td className="border">{bill.product_name}</td>
                  <td className="border">{bill.product_price}</td>
                  <td className="border">{bill.product_qty}</td>
                  <td className="border">{bill.product_gst} %</td>
                  <td className="border">{bill.total_price}</td>
                </tr>
              ))}
              <tr style={{ color: "black" }}>
                <td></td>
                <td></td>
                <td></td>
                <td className="border" style={{ color: "black" }}>
                  SubTotal:{" "}
                </td>
                <td className="border" style={{ color: "black" }}>
                  {this.props.Total}
                </td>
              </tr>
              <tr style={{ color: "black" }}>
                <td colSpan="3" className="border">
                  <p className="text-xs w-[200px]">
                    Bill Number: <span>{this.props.BillNumber}</span>
                  </p>
                </td>
                <td className="border" style={{ color: "black" }}>
                  Due Ammount:{" "}
                </td>
                <td className="border" style={{ color: "black" }}>
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
