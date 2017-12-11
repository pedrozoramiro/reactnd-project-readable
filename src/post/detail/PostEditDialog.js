import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { reduxForm, Field } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { requestAllCategories } from '../category/categoryActions'
import MenuItem from 'material-ui/MenuItem';
import { renderTextField, renderSelectField } from '../../commons/reduxFormComponents'

class PostEditDialog extends Component {

    componentWillReceiveProps(nextProps) {
        const { postEdit, initialize } = nextProps
        if (postEdit && (!this.props.postEdit || this.props.postEdit.id !== postEdit.id)){
            initialize(postEdit);
            return;
        }
    }

    render() {
        const { categories, handleSubmit, open, handleCloseModal, invalid, submitting, onSubmit } = this.props;
        const { postEdit } = this.props;
        return (
            <Dialog title="Novo post" modal={false} open={open}>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="title"
                        label="Título"
                        component={renderTextField}
                    />
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
                        {(categories || []).map(category => (
                            <MenuItem
                                primaryText={category.name}
                                key={category.name}
                                value={category.path}
                            />
                        ))}
                    </Field>
                    <Field
                        name="body"
                        label="Texto"
                        component={renderTextField}
                    />

                    <div>

                        <Row>
                            <Col xs >
                                <RaisedButton
                                    label="Salvar"
                                    primary
                                    fullWidth
                                    disabled={invalid || submitting}
                                    type="submit"
                                />
                            </Col>
                            <Col xs >
                                <RaisedButton
                                    color="primary"
                                    onClick={handleCloseModal}
                                    label="Fechar"
                                    fullWidth
                                />
                            </Col>
                        </Row>
                    </div>
                </form>
            </Dialog>
        )
    }

}


function mapStateToProps(state) {
    const { categories } = state;
    return { ...categories };
}

PostEditDialog = reduxForm({ form: 'PostEditForm' })(PostEditDialog)
PostEditDialog = connect(mapStateToProps, null)(PostEditDialog)
export default PostEditDialog

