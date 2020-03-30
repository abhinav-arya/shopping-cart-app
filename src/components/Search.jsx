import React from 'react'
import { Link } from 'react-router-dom'

const Search = ( props ) => {
    return (
        <button className="btn btn-outline-success my-2 my-sm-0" value="Search" > 
            <Link to={{ pathname: '/lookup', params:{search: props.searchKey}}}><i className="fas fa-search"></i></Link>
        </button>
    )
}

export default Search