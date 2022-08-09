const TimeframeDropDown = ({timeframe, changeTimeframe}) => {

    return (
        <div className="timeframe">
            <form>
                <h4>Choose Timeframe</h4>
                <div className="timeframe-content">
                    <p>Timeframe</p>
                    <select
                    value={timeframe}
                    onChange={changeTimeframe}>
                        <option value="D1">D1</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default TimeframeDropDown