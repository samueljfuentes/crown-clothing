import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../database/firebase.utils';

import './signup.styles.scss';

class SignUp extends React.Component {
   constructor() {
      super();

      this.state = {
         displayName: '',
         email: '',
         password: '',
         confirmPassword: ''
      }
   }

   handleSubmit = async (event) => {
      event.preventDefault();
      const { displayName, email, password, confirmPassword } = this.state;

      // if passwords dont match, alert user and stop execution...
      if (password !== confirmPassword) {
         alert("Passwords don't match!!");
         return;
      }
      
      // when passwords match, create new user using auth library with email and password...
      try {
         // destructure the user property to get userAuth from the return of the auth.createuser...
         const { user } = await auth.createUserWithEmailAndPassword(email, password);
         
         // create snapshot from the userAuth of current user, and also set displayName as a property equal to the input displayName...
         await createUserProfileDocument(user, { displayName })

         // once snapshot has returned, setState back to initial to clear form...
         this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
         })
      
      } catch (error) {
         console.error(error);
      }
   }

   handleChange = (event) => {
      // everytime something on said input changes, take the name of input and value off the target...
      const { name, value } = event.target;
      // reset state using the name of the input as the key, and the input value as the new value...
      this.setState({[name]: value});
   }

   render() {
      
      const { displayName, email, password, confirmPassword } = this.state;

      return(
         <div className='signup'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your e-mail and password</span>
            <form className='signup-form' onSubmit={this.handleSubmit}>
               <FormInput
                  type='text' 
                  name='displayName' 
                  value={displayName} 
                  onChange={this.handleChange}
                  label='Display Name'
                  required
               />

               <FormInput
                  type='email' 
                  name='email' 
                  value={email} 
                  onChange={this.handleChange}
                  label='E-mail'
                  required
               />

               <FormInput
                  type='password' 
                  name='password' 
                  value={password} 
                  onChange={this.handleChange}
                  label='Password'
                  required
               />

               <FormInput
                  type='password' 
                  name='confirmPassword' 
                  value={confirmPassword} 
                  onChange={this.handleChange}
                  label='Confirm Password'
                  required
               />

               <CustomButton type='submit'> SIGN UP </CustomButton>
            </form>
         </div>
      )
   }
}

export default SignUp;