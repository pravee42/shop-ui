import React, { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const changeOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="page">
      <div className="nav-bar">
        <div className="nav-bar-1">
          <Link href="/company/home" className="button-navbar-link">
            Dashboard
          </Link>
          <Link href="/company/product" className="button-navbar-link">
            Product
          </Link>
          <Link href="/bill/bill" className="button-navbar-link">
            Bill
          </Link>
          <Link href="/filter/filter" className="button-navbar-link">
            Filter Bill
          </Link>
          {/* <Link href='/company/service' className='button-navbar-link'>
						Service
					</Link>
					<Link href='/company/quotation' className='button-navbar-link'>
						Quotation
					</Link> */}
          <Link href="/report/report" className="button-navbar-link">
            Monthly Report
          </Link>
          <button
            onClick={() => {
              if (process.browser) {
                localStorage.clear();
                window.location.href = "/";
              }
            }}
            className="text"
          >
            Log out
          </button>
        </div>
        <button className="p-2 bg-blue-500 border rounded border-slate-500 nav-bar-2 fixed top-2 left-2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 m-[10px]">
          <i
            className="bi bi-three-dots text-blue-100"
            onClick={changeOpen}
          ></i>
        </button>
        {open === true && (
          <div className="absolute z-10 w-full h-full bg-slate-100 p-[10px]">
            <div className="grid grid-rows-6 gap-3">
              <Link href="/company/home" className="button-navbar-link">
                Dashboard
              </Link>
              <Link href="/company/product" className="button-navbar-link">
                Product
              </Link>
              <Link href="/bill/bill" className="button-navbar-link">
                Bill
              </Link>
              <Link href="/filter/filter" className="button-navbar-link">
                Filter Bill
              </Link>
              {/* <Link href='/company/service' className='button-navbar-link'>
						Service
					</Link>
					<Link href='/company/quotation' className='button-navbar-link'>
						Quotation
					</Link> */}
              <Link href="/report/report" className="button-navbar-link">
                Monthly Report
              </Link>
              <button
                onClick={() => {
                  if (process.browser) {
                    localStorage.clear();
                    window.location.href = "/";
                  }
                }}
                className="text"
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
