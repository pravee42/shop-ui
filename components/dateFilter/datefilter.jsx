import React, {useState, useEffect} from 'react';
import {filterBillbyDate} from '../data/config';

export default function DateFilter() {
    const [billData, setBillData] = useState([]);
    const [date, setDate] = useState([])
    useEffect(() => {

    }, [date])
    return (
      <div style={{display: 'flex'}}>

      </div>
    )
}
