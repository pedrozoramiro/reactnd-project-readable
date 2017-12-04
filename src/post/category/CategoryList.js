import React, { Component }  from 'react';

import RaisedButton from 'material-ui/RaisedButton';
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
                <RaisedButton  onClick={()=>handleToCategory()}>Todos</RaisedButton>
                {categories.map((category,key)=>(
                     <RaisedButton  key={key} onClick={()=>handleToCategory(category.path)}>{category.name}</RaisedButton>)
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
