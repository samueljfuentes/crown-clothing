import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, ...otherProps}) => {
   return (
      // if isGoogleSignIn, add google-sign-in class for styling. otherwise custom-button only...
      <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
         {children}
      </button>
   )
}

export default CustomButton;