import { useState } from 'react'

const CurrencyDropDown = ({baseCurrency, quoteCurrency, changeBase, changeQuote, onGetBase, onGetQuote, editBaseValue, symbols}) => {

    const [showList, setShowList] = useState(true)

    const handleEditBaseValue = (e) => {
        editBaseValue(e.target.innerText)
        setTimeout(() => {
            setShowList(false)
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
                    onClick={onGetBase}
                    />
                    { showList && <div className="base-container">
                        {symbols.map((symbol, index) =>
                        <div className="symbol" key={index} onClick={handleEditBaseValue}>{symbol}</div>
                        )}
                    </div>}
                </div>
                <div className="quote-currency">
                    <p>Quote Currency</p>
                    <input
                    readOnly
                    value={quoteCurrency}
                    onChange={changeQuote}
                    onClick={onGetQuote}
                    />
                </div>
            </form>
        </div>
    )
}

export default CurrencyDropDown