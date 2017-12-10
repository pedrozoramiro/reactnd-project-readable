import React, { Component }  from 'react';

import { connect } from 'react-redux'
import {requestAllCategories} from './categoryActions'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

class CategoryList extends Component {

    componentDidMount =() =>{
        this.props.getAllCategories();
        
    }

    
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleChange = (event, index, value) =>{
    const {handleToCategory} = this.props;
    this.setState({value});
    handleToCategory(value);
  } 


    render() {
        const {categories} = this.props;
        return (
            <DropDownMenu  value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={""} primaryText="Todas as categorias" />
            {categories.map((category,key)=>(
                     <MenuItem  key={key} value={category.path} primaryText={category.name}/>)
            )} 
          </DropDownMenu>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getAllCategories: () => dispatch(requestAllCategories())
    }
  }

function mapStateToProps (state) {
    const {categories} = state;
    return {...categories};
}
  
 export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)
