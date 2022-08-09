import { useState } from "react";
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
    const [quoteCurrency, setQuoteCurrency] = useState("")
    const [timeframe, setTimeframe] = useState('D1')
    const [symbolsError, setSymbolsError] = useState('')
    const [symbols, setSymbols] = useState([])

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
                setSymbolsError("Unable to fetch data. Try again later")
            }else {
                console.log(result.message)
                setSymbols(result.message)
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

    }

    return (
        <div>
            <Navbar />
            <div className="input-container">
                <div className="currency-timeframe">
                    <CurrencyDropDown baseCurrency={baseCurrency} quoteCurrency={quoteCurrency} changeBase={handleBase} changeQuote={handleQuote} onGetBase={getBaseCurrency} onGetQuote={getQuoteCurrency} symbols={symbols} editBaseValue={editBaseValue} />
                    <TimeframeDropDown timeframe={timeframe} changeTimeframe={handleTimeframe} />
                </div>
                <div className="load-btn">
                    <button>Load Chart</button>
                </div>
            </div>
            { symbolsError && <div className="symbols-error">{symbolsError}</div>}
            <ForexChart />
            <div className="alert-container">
                <h3>Set Alert</h3>
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