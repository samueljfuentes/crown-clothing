import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../database/firebase.utils'; 

import './signin.styles.scss';

class SignIn extends React.Component {
   
   constructor(props) {
      super();

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
         console.log(error);
      }
   };

   handleChange = (event) => {
      // from the event, take out the value (what user types) and name (email or password)...
      const { value, name } = event.target;
      // sets the state of whatever name is being targeted (email, password), and sets it to the value of the value of the target (ie, what the user typed in...)
      this.setState({ [name]: value });
   };

   render() {
      return(
         <div className='sign-in'>
            <h2>I Already Have An Account</h2>
            <span>Sign in with your e-mail and password</span>

            <form onSubmit={this.handleSubmit}>
               <FormInput type="email" name="email" label="email" value={this.state.email} handleChange={this.handleChange} required/>
               <FormInput type="password" name="password" label="password" value={this.state.password} handleChange={this.handleChange} required/>

               <div className="buttons">
                  <CustomButton type="submit"> sign in </CustomButton>
                  <CustomButton onClick={signInWithGoogle} isGoogleSignIn> sign in with google </CustomButton>
               </div>
            </form>
         </div>
      )
   };
}

export default SignIn;