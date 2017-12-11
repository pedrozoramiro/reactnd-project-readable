import React, { Component } from 'react';

import { connect } from 'react-redux'
import { requestAllCategories } from './categoryActions'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySelected: "",
    };
  }

  handleChange = (event, index, categorySelected) => {
    const { history } = this.props;
    this.setState({ categorySelected });
    history.push(`/${categorySelected}`,categorySelected);
  }


  render() {
    const { categories } = this.props;
    const { categorySelected } = this.state;
    return (
      <DropDownMenu value={categorySelected} onChange={this.handleChange}>
        <MenuItem value={""} primaryText="Todas as categorias" />
        {categories.map((category, key) => (
          <MenuItem key={key} value={category.path} primaryText={category.name} />)
        )}
      </DropDownMenu>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => dispatch(requestAllCategories())
  }
}

function mapStateToProps(state) {
  const { categories } = state;
  return { ...categories };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
