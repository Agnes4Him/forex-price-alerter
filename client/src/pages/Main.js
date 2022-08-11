import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CurrencyDropDown from "../components/CurrencyDropDown";
import TimeframeDropDown from "../components/TimeframeDropDown";
import ForexChart from "../components/ForexChart";
import TargetPrice from "../components/TargetPrice";
import ToggleButton from "../components/ToggleButton";
import GetEmail from "../components/GetEmail";
import Footer from "../components/Footer";

const Main = () => {

    const [toggle, setToggle] = useState(true)
    const [baseCurrency, setBaseCurrency] = useState("EUR")
    const [quoteCurrency, setQuoteCurrency] = useState("USD")
    const [timeframe, setTimeframe] = useState('D1')
    const [error, setError] = useState('')
    const [baseSymbols, setBaseSymbols] = useState([])
    const [quoteSymbols, setQuoteSymbols] = useState([])
    const [chartValues, setChartValues] = useState({})

    useEffect(() => {
        fetch(`/api/forex/prices/base/${baseCurrency}/quote/${quoteCurrency}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.message === "internal_error") {
                setError("Unable to load chart. Try again later")
            }else {
                setChartValues(data.message.rates)
            }
        })     
    }, [baseCurrency, quoteCurrency]) 

    const handleToggleOff = () => {
        setToggle(false)
    }

    const handleToggleOn = () => {
        setToggle(true)
    }

    const handleBase = (e) => {
        setBaseCurrency(e.target.value)
    }

    const handleQuote = (e) => {
        setQuoteCurrency(e.target.value)
    }

    const handleTimeframe = (e) => {
        setTimeframe(e.target.value)
    }

    const getBaseCurrency = () => {
        fetch('/api/forex/currency')
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            if (result.message === "internal_error") {
                console.log("Unable to fetch data. Try again later")
                setError("Unable to fetch data. Try again later")
            }else {
                console.log(result.message)
                setBaseSymbols(result.message)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const editBaseValue = (baseValue) => {
        setBaseCurrency(baseValue)
    }

    const getQuoteCurrency = () => {
        fetch('/api/forex/currency')
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            if (result.message === "internal_error") {
                console.log("Unable to fetch data. Try again later")
                setError("Unable to fetch data. Try again later")
            }else {
                console.log(result.message)
                setQuoteSymbols(result.message)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const editQuoteValue = (quoteValue) => {
        setQuoteCurrency(quoteValue)
    }

    const handleLoadChart = () => {
        fetch(`/api/forex/prices/base/${baseCurrency}/quote/${quoteCurrency}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.message === "internal_error") {
                setError("Unable to load chart. Try again later")
            }else {
                console.log(Object.keys(data.message.rates))
                var prices = Object.values(data.message.rates)
                var priceArray = []
                prices.map((price) => priceArray.push((Object.values(price))[0])) 
                console.log(priceArray)
                setChartValues(data.message.rates)
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="input-container">
                <div className="currency-timeframe">
                    <CurrencyDropDown baseCurrency={baseCurrency} quoteCurrency={quoteCurrency} changeBase={handleBase} changeQuote={handleQuote} onGetBase={getBaseCurrency} onGetQuote={getQuoteCurrency} bsymbols={baseSymbols} editBaseValue={editBaseValue} editQuoteValue={editQuoteValue} qsymbols={quoteSymbols} />
                    <TimeframeDropDown timeframe={timeframe} changeTimeframe={handleTimeframe} />
                </div>
                <div className="load-btn">
                    <button onClick={handleLoadChart}>Load Chart</button>
                </div>
            </div>
            { error ? <div className="symbols-error">{error}</div> : <ForexChart chartValues={chartValues} baseCurrency={baseCurrency} quoteCurrency={quoteCurrency} /> }
            <div className="alert-container">
                <h3>Set Alert</h3>
                <hr />
                <div className="alert">
                    <TargetPrice />
                    <ToggleButton onOn={handleToggleOff} onOff={handleToggleOn} toggle={toggle} />
                </div>
            </div>
            { !toggle && <GetEmail /> }
            <Footer />
        </div>
    )
}

export default Main