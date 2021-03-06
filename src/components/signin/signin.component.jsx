import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../database/firebase.utils'; 

import {
   SignInContainer,
   Title,
   ButtonsContainer
} from './signin.styles';

class SignIn extends React.Component {
   
   constructor(props) {
      super(props);

      this.state = {
         email: '',
         password: ''
      }
   };

   handleSubmit = async (event) => {
      event.preventDefault();

      const { email, password } = this.state;

      try {
         await auth.signInWithEmailAndPassword(email, password);
         this.setState({ email: '', password: '' });
      } catch (error) {
         alert(error);
      }
   };

   handleChange = (event) => {
      // from the event, take out the value (what user types) and name (email or password)...
      const { value, name } = event.target;
      this.setState({ [name]: value });
   };

   render() {
      return (
         <SignInContainer>
            <Title>I Already Have An Account</Title>
            <span>Sign in with your e-mail and password</span>

            <form onSubmit={this.handleSubmit}>
               <FormInput type="email" name="email" label="email" value={this.state.email} handleChange={this.handleChange} required/>
               <FormInput type="password" name="password" label="password" value={this.state.password} handleChange={this.handleChange} required/>

               <ButtonsContainer>
                  <CustomButton type="submit"> sign in </CustomButton>
                  <CustomButton onClick={signInWithGoogle} isGoogleSignIn> sign in with google </CustomButton>
               </ButtonsContainer>
            </form>
         </SignInContainer>
      );
   }
}

export default SignIn;