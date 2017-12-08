import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { reduxForm, Field } from 'redux-form';
import Dialog  from 'material-ui/Dialog';
import  TextField  from 'material-ui/TextField';
import  RaisedButton  from 'material-ui/RaisedButton';
import  SelectField  from 'material-ui/SelectField';

import {fetchAllCategories} from '../category/categoryAction'

import MenuItem from 'material-ui/MenuItem';
import {renderTextField,renderSelectField} from '../../commons/reduxFormComponents'
  
class PostEditDialog extends Component {
    
    componentDidMount =() =>{
        this.props.fetchAllCategories();
    }

    render(){
        const {categories,handleSubmit,open,handleCloseModal,invalid,submitting,onSubmit} = this.props;
        return (
            <Dialog title="Novo post"  modal={false} open={open}>
            <form onSubmit={handleSubmit}>
                <Field
                    name="author"
                    label="Autor"
                    component={renderTextField}
                />
                <Field
                    name="category"
                    label="Category"
                    placeholder="Categoria"
                    component={renderSelectField}
                >
                    {(categories || []) .map(category => (
                        <MenuItem
                            primaryText={category.name}
                            key={category.name}
                            value={category.path}
                    />
                    ))}
                </Field>
                <Field
                    name="title"
                    label="Título"
                    component={renderTextField}
                />
                <Field
                    name="body"
                    label="Texto"
                    component={renderTextField}
                />

                <div>
                    <RaisedButton
                        color="primary"
                        onClick={handleCloseModal}
                        label="Fechar"
                        fullWidth
                    />
                    <RaisedButton
                        label="Salvar"
                        primary
                        fullWidth
                        disabled={invalid || submitting}
                        type="submit"
                    />
                </div>
            </form>
        </Dialog>
        )
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

PostEditDialog = reduxForm({form: 'PostEdit'})(PostEditDialog)
PostEditDialog = connect(mapStateToProps, mapDispatchToProps)(PostEditDialog)
export default PostEditDialog
    
