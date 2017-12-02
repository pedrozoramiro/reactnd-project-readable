import React, { Component }  from 'react';
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import {fetchAllCategories} from './categoryAction'

class CategoryList extends Component {

    componentDidMount =() =>{
        this.props.fetchAllCategories();
    }

    render() {
        const {categories,handleToCategory} = this.props;
        return (
            <div>
                <button onClick={()=>handleToCategory()}>Todos</button>
                {categories.map((category,key)=>(
                     <button key={key} onClick={()=>handleToCategory(category.path)}>{category.name}</button>)
                )} 
            </div>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchAllCategories: (data) => dispatch(fetchAllCategories(data))
    }
  }

function mapStateToProps (state) {
    const {categories} = state;
    return {...categories};
}
  
 export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)
