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
    const [success, setSuccess] = useState('')
    const [alertError, setAlertError] = useState('')
    const [baseSymbols, setBaseSymbols] = useState([])
    const [quoteSymbols, setQuoteSymbols] = useState([])
    const [chartValues, setChartValues] = useState({})
    const [alertPrice, setAlertPrice] = useState(null)
    const [email, setEmail] = useState("")

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
                setChartValues(data.message.rates)
            }
        })
    }

    const editAlertPrice = (e) => {
        setAlertPrice(e.target.value)
    }

    const handleOnSetAlert = (e) => {
        e.preventDefault()
        let currency = baseCurrency + quoteCurrency
        let alertItemsArr = []
        if (!localStorage.getItem('alert')) {
            let alertItemsObj = {pair:currency, price:alertPrice}  
            alertItemsArr.push(alertItemsObj)        
            localStorage.setItem('alert', JSON.stringify(alertItemsArr))
        }else if (localStorage.getItem('alert')) {
            let alertItems = JSON.parse(localStorage.getItem('alert'))
            if (alertItems.some(e => e.pair === currency)) {
                let i;
                for (i = 0; i < alertItems.length; i++) {
                    if (alertItems[i].pair === currency) {
                    alertItems[i].price = alertPrice
                    }
                }
            }else {
                alertItems.push({pair:currency, price:alertPrice})
            } 
            localStorage.setItem('alert', JSON.stringify(alertItems))
            setInterval(() => {
                setSuccess("Target Price successfully saved")
            }, 1000)
        }
    }

    const handleOnSetEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleOnSaveEmail = (e) => {
        e.preventDefault()
        if (email.length === 0) {
            setAlertError("Email field cannot be empty")
        }else {
            localStorage.setItem('email', email)
            setInterval(() => {
                setSuccess("Email successfully saved")
            }, 1500)
        }
    }

    useEffect(() => {
        let alertPairs = JSON.parse(localStorage.getItem('alert'))
        let i
        for (i = 0; i < alertPairs.length; i++) {
            let price = alertPairs[i].price
            let currencyPairs = alertPairs[i].pair
            let splitPairs = currencyPairs.split("")
            const source = splitPairs[0] + splitPairs[1] + splitPairs[2]
            const currency = splitPairs[3] + splitPairs[4] + splitPairs[5]
            fetch(`/api/forex/live/source/${source}/currency/${currency}`)
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                console.log(result)
                if (result.message === "internal_error") {
                    setError("Unable to get alert update.")
                }else {
                    //set alert here... 
                    let resultPrice = Object.values(result.message)[0]
                    if (price === resultPrice) {
                        const msg = new SpeechSynthesisUtterance()
                        msg.text = `Price for ${currencyPairs} now at target price ${price}`
                        window.speechSynthesis.speak(msg)
                        if (localStorage.getItem('email')) {
                            const email = localStorage.getItem('email')
                            const obj = {
                                email : email,
                                pair : currencyPairs,
                                price : price
                            }
                            fetch("/api/price/send", {
                                method:"POST",
                                headers: {
                                    "Content-type": "application/json"
                                },
                                body : JSON.stringify(obj)
                            })
                            .then((response) => {
                                localStorage.removeItem('email')
                            })
                        }
                    }           
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [quoteCurrency, baseCurrency])

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
                <h3>Set Alert for {baseCurrency}{quoteCurrency}</h3>
                <hr />
                <div className="alert">
                    <TargetPrice alertPrice={alertPrice} editAlertPrice={editAlertPrice} onSetAlert={handleOnSetAlert} />
                    <ToggleButton onOn={handleToggleOff} onOff={handleToggleOn} toggle={toggle} />
                </div>
            </div>
            <div className="email-container">
                { !toggle && <GetEmail email={email} onSetEmail={handleOnSetEmail} onSaveEmail={handleOnSaveEmail} /> }
                { !alertError && success && <p className="success-message">{success}</p> }
                { !success && alertError && <p className="alert-error">{alertError}</p>}
            </div>
            <Footer />
        </div>
    )
}

export default Main