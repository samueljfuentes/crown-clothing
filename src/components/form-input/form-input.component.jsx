import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
   return(
      <div className="group">
         <input className="form-input" onChange={handleChange} {...otherProps /* all props from signin component such as name, value, type */}/>
         {
            // if there is a label, render the label div with dynamic values, otherwise render null
            label ? 
            // if value exists, apply the shrink class name shrink. always has form-input label class
            //ie... as soon as someone types, add shrink class
            (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
               {label}
            </label>)
            : null
         }
      </div>
   )
}

export default FormInput;