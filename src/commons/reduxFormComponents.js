import React, { Component }  from 'react';
import  TextField  from 'material-ui/TextField';
import  SelectField  from 'material-ui/SelectField';

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}      
    fullWidth
    {...input}
    {...custom}
    />
)

export const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    fullWidth
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}/>
)
