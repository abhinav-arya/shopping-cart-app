import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import intl from '../locale.json'
import { bindActionCreators } from 'redux'
import * as ShoppingListActions from '../actions/ShoppingListActions'

class ShoppingCart extends React.Component {

    reduceQuantity = (id) => {
        let itemSet = this.props.items.map(item => {
            if (id === item.id && item.quantity > 1) {
                item.quantity -= 1
            }
            return item
        })

        this.props.actions.reduceCartQuantity(itemSet)
    }

    addQuantity = (id) => {
        let itemSet = this.props.items.map(item => {
            if (id === item.id) {
                item.quantity += 1
            }
            return item
        })   
        this.props.actions.addCartQuantity(itemSet)
    }

    removeFromCart = (id) => {
        let removeIndex = -1
        this.props.items.forEach((item, index) => {
            if (id === item.id) {
                removeIndex = index
            }
        })

        if (removeIndex !== -1) {
            let itemSet = this.props.items
            itemSet.splice(removeIndex, 1)
            this.props.actions.removeFromCart(itemSet)
        }
    }

    render(){
              
        let totalPrice = 0
        let totalDiscount = 0
        this.props.items.forEach((element) => {
            totalPrice += (element.price * element.quantity)
            totalDiscount += (element.discount * element.quantity)
        })
        let cartItems = this.props.items.length ?
            (  
                this.props.items.map(item=>{
                    return(
                        <li className="collection-item cart-item" key={item.id}>
                            <div className="item-img"> 
                                <img src={item.img} alt={item.img} className=""/>
                                <div className="item-desc">
                                    <span className="title">{item.title}</span>
                                    <p><b>Price: {intl.CURRENCY.IN}{item.price}</b></p> 
                                    <b>Quantity</b>
                                    <div className="add-remove">
                                        <Link to="/shopping-cart" onClick={() => this.reduceQuantity(item.id)}><i className="far fa-minus-square"></i></Link>
                                        <b>{item.quantity}</b> 
                                        <Link to="/shopping-cart" onClick={() => this.addQuantity(item.id)}><i className="far fa-plus-square"></i></Link>
                                    </div>
                                </div>
                                <button className="btn btn-danger btn-remove-from-cart" type="submit" onClick={() => this.removeFromCart(item.id)}>Remove</button>
                            </div>
                        </li>                        
                    )
                })
            ) : (
                <p>Oops! Your cart is empty, <Link to="/">let's fill it up?</Link></p>
            )

       return(
            <div className="container">
                <div className="row">
                    <div className="cart col-sm-8">
                        <h5>Your Shopping Bag:</h5>
                        <ul className="collection">
                            {cartItems}
                        </ul>
                    </div>  
                    <div className="cart col-sm-3 cart-detail">
                        <h5>Price Details</h5>
                        <hr className="line--price-detail"/>
                        <h6>Price : {intl.CURRENCY.IN}{totalPrice}</h6>
                        <h6>Discount : {intl.CURRENCY.IN}{totalDiscount}</h6>
                        <hr className="line-price"/>
                        <h6><b>Total Payable : {intl.CURRENCY.IN}{totalPrice - totalDiscount}</b></h6>
                    </div>
                </div>
            </div>
       )
    }
}

const mapStateToProps = (state => {
    return {
        items: state.addedItems
    }
})

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ShoppingListActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)