const GetEmail = ({email, onSetEmail, onSaveEmail}) => {
    return (
        <div className="get-email">
            <form onSubmit={onSaveEmail}>
                <input
                type="email" 
                placeholder="Enter your Email Address"
                value={email}
                onChange={onSetEmail}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default GetEmail