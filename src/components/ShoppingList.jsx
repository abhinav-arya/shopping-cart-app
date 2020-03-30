import React from 'react'
import { connect } from 'react-redux'
import * as ShoppingListActions from '../actions/ShoppingListActions'
import Filter from './Filter'
import { bindActionCreators } from 'redux'
import intl from '../locale.json'

class ShoppingList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filterRange: {
                min: 0,
                max: 0
            },
            filterRangeRecieved: false
        }
    }

    handleFilterToggle = ((min, max) => {
        this.setState({
            filterRange: {
                min: min,
                max: max
            },
            filterRangeRecieved: true
        })
    })

    handleClick = (id) => { 

        // Update the cart store with the newly added/modified item
        this.props.actions.addToCart(id)
    }

    componentDidMount = () => {

        // Fetch shopping list data from the service and update the redux store
        this.props.actions.fetchShoppingList()
    }
    
    render() {
        let searchMode = (this.props.location.params && this.props.location.params.search.length>3)
        if (this.props.itemsFetchPending) {
            return (
                <div>
                    <h5>Please Wait...</h5>
                </div>
            )
        }
        if (this.props.itemsFetchFailure) {
            return (
                <div>
                    <h5>Oops! Something went wront... <p>Server Response: "{this.props.itemsFetchError}"</p></h5>
                </div>
            )
        }
        let itemList = this.props.items.map(item=>{
            let searchFlag = searchMode ? (item.title.toLowerCase() === this.props.location.params.search.toLowerCase()) : true
            if (this.state.filterRangeRecieved && this.state.filterRange.min <= item.price && 
                this.state.filterRange.max >= item.price && searchFlag) {
                return(
                    <div className="card" key={item.id}>
                            <img src={item.img} alt={item.title}/>
                            <span className="card-title">{item.title}</span>
                            <div className="card-content">
                                <p><b>Price: {intl.CURRENCY.IN} {item.price}</b></p>
                            </div>
                            <button type="button" onClick={()=>{this.handleClick(item.id)}} className="btn btn-warning btn-add-cart">Add to Cart</button>
                     </div>
                )
            }
            else {
                return null
            }
        })
        
        return(
            <div className="container container-shopping-list">
                <div className="row">
                    <div className="filter-panel col-sm-3">
                        <Filter filterToggle={this.handleFilterToggle}/>
                    </div>
                    <div className="box col-sm-9">
                        {itemList}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        itemsFetchPending: state.itemsFetchPending,
        itemsFetchSuccess: state.itemsFetchSuccess,
        itemsFetchFailure: state.itemsFetchFailure,
        itemsFetchError: state.itemsFetchError,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ShoppingListActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)