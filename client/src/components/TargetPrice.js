const TargetPrice = () => {
    return (
        <div className="target-price">
            <form className="target-form">
                <p>Enter Target Price</p>
                <input 
                type="text"
                placeholder="Target Price" 
                />
                <div className="target-btn">
                  <button>Save</button>
                </div>
            </form>
        </div>
    )
}

export default TargetPrice