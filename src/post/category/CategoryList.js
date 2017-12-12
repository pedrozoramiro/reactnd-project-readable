import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { connect } from 'react-redux'
import { requestAllCategories } from './categoryActions'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';


class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySelected: "",
    };
  }

  handleChange = (categorySelected) => {
    const { history } = this.props;
    this.setState({ categorySelected });
    history.push(`/${categorySelected}`, categorySelected);
  }


  render() {
    const { categories } = this.props;
    const { categorySelected } = this.state;
    return (
      <div>
        <RaisedButton label="Todas as categorias" primary onClick={() => this.handleChange("")} />
        {categories.map((category, key) => (
          <RaisedButton key={key} label={category.name} primary onClick={() => this.handleChange(`${category.path}`)} />
        )
        )}
      </div>
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
