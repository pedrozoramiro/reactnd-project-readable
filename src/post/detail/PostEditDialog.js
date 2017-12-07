import React, { Component }  from 'react';
import PropTypes from 'prop-types';

import {Field, reduxForm} from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import Dialog  from 'material-ui/Dialog';
import  TextField  from 'material-ui/TextField';
import  RaisedButton  from 'material-ui/RaisedButton';

export const TextFieldDefault = ({input, ...custom}) => (
        <TextField
            {...input}
            {...custom}
            fullWidth
        />
);

let PostEditDialog = ({handleSubmit,open,handleCloseModal,invalid , submitting}) => (

    <Dialog modal={false}open={open}>
    
    <form onSubmit={handleSubmit}>
        <Field
            name="author"
            label="Autor"
            placeholder="Autor"
            fullWidth
            component={TextField}
        />
         <div>
            <FlatButton
                color="primary"
                onClick={()=>handleCloseModal()}
                label="Fechar"
            />

    <RaisedButton
        label="Salvar"
        primary
        disabled={invalid || submitting}
        type="submit"
      />
      
        </div>
    </form>
  </Dialog>
);

PostEditDialog = reduxForm({
    // a unique name for the form
    form: 'PostEdit'
  })(PostEditDialog)
  
  export default PostEditDialog;
