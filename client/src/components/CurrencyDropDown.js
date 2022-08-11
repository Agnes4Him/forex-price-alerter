import { useState } from 'react'

const CurrencyDropDown = ({baseCurrency, quoteCurrency, changeBase, changeQuote, onGetBase, onGetQuote, editBaseValue, editQuoteValue, bsymbols, qsymbols}) => {

    const [showBaseList, setShowBaseList] = useState(true)
    const [showQuoteList, setShowQuoteList] = useState(true)

    const handleOnGetBase = () => {
        onGetBase()
        setShowBaseList(true)
    }

    const handleOnGetQuote = () => {
        onGetQuote()
        setShowQuoteList(true)
    }

    const handleEditBaseValue = (e) => {
        editBaseValue(e.target.innerText)
        setTimeout(() => {
            setShowBaseList(false)
        }, 1000)
    }

    const handleEditQuoteValue = (e) => {
        editQuoteValue(e.target.innerText)
        setTimeout(() => {
            setShowQuoteList(false)
        }, 1000)
    }

    return (
        <div className="currency">
            <h4>Choose Currency</h4>
            <form>
                <div className="base-currency">
                    <p>Base Currency</p>
                    <input
                    readOnly
                    value={baseCurrency}
                    onChange={changeBase}
                    onClick={handleOnGetBase}
                    />
                    { showBaseList && <div className="base-container">
                        {bsymbols.map((bsymbol, index) =>
                        <div className="base-symbol" key={index} onClick={handleEditBaseValue}>{bsymbol}</div>
                        )}
                    </div>}
                </div>
                <div className="quote-currency">
                    <p>Quote Currency</p>
                    <input
                    readOnly
                    value={quoteCurrency}
                    onChange={changeQuote}
                    onClick={handleOnGetQuote}
                    />
                    { showQuoteList && <div className="quote-container">
                        {qsymbols.map((qsymbol, index) =>
                        <div className="quote-symbol" key={index} onClick={handleEditQuoteValue}>{qsymbol}</div>
                        )}
                    </div>}
                </div>
            </form>
        </div>
    )
}

export default CurrencyDropDown