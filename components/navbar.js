import React, { useState, useContext } from "react";
import Link from "next/link";
import { Authcontext } from "../components/context";

export default function NavBar(props) {
  const [open, setOpen] = useState(false);
  const { AUTHKEY, findAuth } = useContext(Authcontext);

  const changeOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div>
        <div className="d-flex flex-column gap-4 justify-content-evenly bg-primary text-white h-100 p-3 border-xl">
          <Link href="/company/home">
            <button className="btn btn-primary rounded-sm">Dashboard</button>
          </Link>
          <Link href="/company/product" className="text-white p-1 btn">
            <button className="btn btn-primary rounded-sm">Product</button>
          </Link>
          <Link href="/bill/bill" className="text-white p-1 btn">
            <button className="btn btn-primary rounded-sm">Bill</button>
          </Link>
          <Link href="/filter/filter" className="text-white p-1 btn">
            <button className="btn btn-primary rounded-sm">Filter Bill</button>
          </Link>
          {/* <Link href='/company/service' className='text-white p-1 btn'>
						Service
					</Link>
					<Link href='/company/quotation' className='text-white p-1 btn'>
						Quotation
					</Link> */}
          <Link href="/report/report" className="text-white p-1 btn">
            <button className="btn btn-primary rounded-sm">
              Monthly Report
            </button>
          </Link>
          <button
            onClick={() => {
              if (process.browser) {
                localStorage.clear();
                window.location.href = "/";
              }
            }}
            className="btn btn-primary"
          >
            Log out
          </button>
        </div>
        {open === true && (
          <div className="absolute z-10 w-full h-full bg-slate-100 p-[10px]">
            <div className="grid grid-rows-6 gap-3">
              <Link
                href="/company/home"
                className="text-white p-1 btn"
                style={{
                  color: "#000",
                  backgroundColor: "#f8f9fa",
                  borderColor: "#f8f9fa",
                }}
              >
                Dashboard
              </Link>
              <Link href="/company/product" className="text-white p-1 btn">
                Product
              </Link>
              <Link href="/bill/bill" className="text-white p-1 btn">
                Bill
              </Link>
              <Link href="/filter/filter" className="text-white p-1 btn">
                Filter Bill
              </Link>
              {/* <Link href='/company/service' className='text-white p-1 btn'>
						Service
					</Link>
					<Link href='/company/quotation' className='text-white p-1 btn'>
						Quotation
					</Link> */}
              <Link href="/report/report" className="text-white p-1 btn">
                Monthly Report
              </Link>
              <button
                onClick={() => {
                  if (process.browser) {
                    localStorage.clear();
                    findAuth();
                  }
                }}
                className="btn btn-primary"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
