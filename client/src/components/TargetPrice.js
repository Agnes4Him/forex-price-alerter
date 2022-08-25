const TargetPrice = ({alertPrice, editAlertPrice, onSetAlert}) => {
    return (
        <div className="target-price">
            <form className="target-form">
                <p>Enter Target Price</p>
                <input 
                type="number"
                value={alertPrice}
                onChange={editAlertPrice}
                placeholder="Target Price" 
                />
                <div className="target-btn">
                  <button onClick={onSetAlert}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default TargetPrice