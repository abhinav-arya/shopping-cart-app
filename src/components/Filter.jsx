import React from 'react'
import InputRange from 'react-input-range'
import { connect } from 'react-redux'

class Filter extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            value: {
                min: 0,
                max: 100
            },
            maxValue: 100,
            filterUpdated: false
        }
    }

    componentDidUpdate = (prevState, props) => {
        
        // set initial filter values based
        //   set maximum filter value to the highest price in the item list
        //   update these values only during init (filterUpdated check), else pick up values from component's state
        let maxValue = Math.max(...this.props.shopState.items.map(item => item.price))
        let minSelectedValue = this.state.filterUpdated ? this.state.value.min : 0
        let maxSelectedValue = this.state.filterUpdated ? this.state.value.max : maxValue
        this.props.filterToggle(minSelectedValue, maxSelectedValue)

        if (this.props.shopState.itemsFetchSuccess && this.props.shopState.items.length > 0 && !this.state.filterUpdated) {
            this.setState({
                value: {
                    min: minSelectedValue,
                    max: maxSelectedValue
                },
                maxValue: maxValue,
                filterUpdated: true
            })
        }
    }

    shouldComponentUpdate(prevState, props) {
        if (props.shopState === prevState.shopState) {
            return false
        }
        return true
    }

    render() {
        if (this.props.shopState.itemsFetchSuccess && this.props.shopState.items.length > 0) {
            return (
                <>
                    <h5>Filter by Price</h5>
                    <InputRange
                        maxValue={this.state.maxValue}
                        minValue={0}
                        formatLabel={value => `Rs. ${value}`}
                        step={50}
                        value={this.state.value}
                        onChange={value => this.setState({ value })}
                    />
                </>
            )
        }
        else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        shopState: state
    }
}

export default connect(mapStateToProps)(Filter)
