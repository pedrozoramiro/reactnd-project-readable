import React from 'react';
import Dialog from 'material-ui/Dialog';

const Dialog = ({children,open}) => {
    return (
      <div>
        <Dialog
          modal={false}
          open={open}
        >
          {children}
        </Dialog>
      </div>
    );
}
export default Dialog;