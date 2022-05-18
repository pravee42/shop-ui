import React, { useState, useEffect } from "react";
import ChartData from "../../components/ChartData";
import { MonthlyProfit, filterBillbyDate } from "../../components/data/config";
import NavBar from "../../components/navbar";

export default function Reports() {
    const [PieDataLables, setPieDataLables] = useState([]);
    const [PieDataBody, setPieDataBody] = useState([]);
    const [filterdataDate, setFilterdataDate] = useState("");
    const [dateData, setDateData] = useState([]);
    useEffect(async () => {
        let data = await MonthlyProfit();
        let labels = [];
        let body = [];
        await data.map(async (aa) => {
            await labels.push(aa.date);
            await body.push(aa.price);
        });
        await setPieDataLables(labels);
        await setPieDataBody(body);
    }, []);

    const filterDateButtonFunction = async () => {
        const response = await filterBillbyDate(filterdataDate);
        await setDateData(response);
        console.log(response);
    };

    return (
        <div className="d-flex flex-row">
            <NavBar />
            <div
                style={{ width: "100vw", height: "100vh", overflowY: "scroll" }}
                className="d-flex flex-column gap-3"
            >
                <div className="d-flex flex-column justify-content-center align-items-center p-3 gap-3">
                    <p className="h6 text-primary">Monthly Sales Report</p>
                    <ChartData
                        PieDataLables={PieDataLables}
                        PieDataBody={PieDataBody}
                    />
                </div>
                <div className="d-flex flex-column gap-3 p-3 align-items-center">
                    <p className="h6 text-dark ">Filter Bill By Date</p>
                    <div className="d-flex flex-row gap-3">
                        <input
                            type="date"
                            className="form-control"
                            onChange={(e) => setFilterdataDate(e.target.value)}
                        />
                        <button
                            className="btn btn-primary w-75"
                            onClick={filterDateButtonFunction}
                        >
                            Search Data
                        </button>
                    </div>
                    <div className="d-flex gap-2 flex-column">
                        <ul className="list-group">
                            {dateData.map((billData) => (
                                <li key={billData.id} className="p-3 gap-3 list-group-item d-flex list-group-item-action justify-content-between">
                                    {billData.bill_number.slice(0, 18)}
                                    <p className="badge bg-danger text-white">
                                        {billData.total_ammount}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
