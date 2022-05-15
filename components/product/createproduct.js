import React, { useState } from "react";
import { CreateProductData, SHOPEMAILID, TodayDate } from "../data/config";
import { Toaster } from "react-hot-toast";

export default function CreateProduct(props) {
  const [productData, setProductData] = useState({
    shop_email: SHOPEMAILID,
    product_name: "",
    date: TodayDate.toString(),
    product_price: 0,
    product_qty: 0,
    product_gst: 0,
    total_price: 0,
  });

  const ChangeData = async () => {
    await CreateProductData(productData, props.getreq);
    await setProductData({
      shop_email: SHOPEMAILID,
      product_name: "",
      date: TodayDate.toString(),
      product_price: 0,
      product_qty: 0,
      product_gst: 0,
      total_price: 0,
    });
  };

  return (
    <div className="d-flex flex-column gap-2">
      <Toaster />
      <h1 className="text-primary h5">Create Product</h1>
      <div className="form-floating mb-3">
        <input
          type="text"
          onChange={(e) =>
            setProductData({ ...productData, product_name: e.target.value })
          }
          className="form-control"
          value={productData.product_name}
        />
        <label for="floatingInput">Product Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          onChange={(e) =>
            setProductData({
              ...productData,
              product_qty: e.target.value,
              total_price:
                parseInt(e.target.value) * parseInt(productData.product_price),
            })
          }
          className="form-control"
          value={productData.product_qty}
        />
        <label for="floatingInput">Quantity</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          onChange={(e) =>
            setProductData({
              ...productData,
              product_gst: parseInt(e.target.value),
            })
          }
          className="form-control"
          value={productData.product_gst}
        />
        <label for="floatingInput">GST</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          className="form-control"
          onChange={(e) =>
            setProductData({
              ...productData,
              product_price: e.target.value,
              total_price:
                parseInt(productData.product_qty) * parseInt(e.target.value),
            })
          }
          value={productData.product_price}
        />
        <label for="floatingInput">Price</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          className="form-control"
          onChange={(e) =>
            setProductData({
              ...productData,
              total_price: e.target.value,
            })
          }
          value={productData.total_price}
        />
        <label for="floatingInput">Total</label>
      </div>

      <button onClick={ChangeData} className="btn btn-outline-primary">
        Save
      </button>
    </div>
  );
}
