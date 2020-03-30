import React from 'react';
import { Link } from 'react-router-dom'
import Search from './Search'

class Header extends React.Component {

    constructor() {
        super()
        this.state = {
            searchKey: ''
        }
    }

    handleInputChange = (event) => {
        this.setState({
            searchKey: event.target.value
        })
    }

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <i className="fas fa-star shop-icon"></i>
                        The ShopKart
                    </Link>
                    
                    <span className="form-inline my-2 my-lg-0">
                        <input id="search-text" className="form-control mr-sm-2" 
                                type="search" placeholder="Search" aria-label="Search Item" onChange={this.handleInputChange}></input>
                        <Search searchKey={this.state.searchKey}/>
                        <Link to="/shopping-cart"><i className="fas fa-shopping-cart cart-icon"></i></Link>
                    </span>
                </div>
            </nav>  
        )
    }
}

export default Header;