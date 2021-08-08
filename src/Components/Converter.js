import React, { useState, useEffect, useRef, useMemo } from 'react'
import axios from 'axios'
import './Converter.css'
export default function Converter() {
    const [allCurrencies, setAllCurrencies] = useState({});
    const [convertAmount, setConvertAmount] = useState(null);
    const [loading, setLoading] = useState(false)
    const [currencyFrom, setCurrencyFrom] = useState()
    const [currencyTo, setCurrencyTo] = useState()
    const [convertResult, setConvertResult] = useState(null)
    const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
    useEffect(() => {
        // const sub = axios.get(URL).then((res) => {
        //     setAllCurrencies(res.data);
        // })
        setLoading(true)
        const subscribe = async () => {
            await axios.get(URL).then((res) => {
                const currencyData = res.data;
                if (loading) {
                    setAllCurrencies(currencyData);
                }
            })
        };
        subscribe();
        return () => {
            setLoading(false)
        }

    }, [loading])
    console.log(allCurrencies)

    // getting the converted amount
    function getAmount(e) {
        e.preventDefault();
        if (currencyFrom && currencyTo && convertAmount) {
            setLoading(true);
            const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyFrom}/${currencyTo}.json`
            axios.get(url).then((res) => {
                setLoading(false);
                setConvertResult(res.data[currencyTo]);
            })
        }
    }
    const finamalAmount = () => {
        if (convertResult) {
            return convertResult * convertAmount;
        }
        return "0";
    }
    console.log("Currency to change", currencyFrom)
    console.log("Currency convert into", currencyTo)
    console.log("Convert Amount is: ", convertAmount)
    return (
        <div className="converter-container">
            <h2>Convert</h2>
            <div>
                <select onChange={(e) => { setCurrencyFrom(e.target.value) }}>
                    <option value="">Choose Currency</option>
                    {
                        Object.keys(allCurrencies).map((key) => {
                            return <option value={key}  >{allCurrencies[key]}</option>
                        })
                    }
                </select>
            </div>
            <h2>To</h2>
            <div>
                <select onChange={(e) => { setCurrencyTo(e.target.value) }}>
                    <option value="">Choose Currency</option>
                    {
                        Object.keys(allCurrencies).map((key) => {
                            return <option value={key}>{allCurrencies[key]}</option>
                        })

                    }
                </select>
            </div>
            <form>
                <input type="number" onChange={(e) => { setConvertAmount(e.target.value) }} placeholder="Amount" />
            </form>
            <button onClick={getAmount}>Convert</button>
            <div>
                <h3><strong>{finamalAmount()}</strong></h3>
            </div>
            {/* Using Semantics UI */}
        </div>
    )
}
