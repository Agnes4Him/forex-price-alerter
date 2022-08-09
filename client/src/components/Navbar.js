import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="nav-container">
            <div>
                <Link to="/" style={{textDecoration:'none'}}><h1>Forex Price Alerter</h1></Link>
            </div>
        </nav>
    )
}

export default Navbar