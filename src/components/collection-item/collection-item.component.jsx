import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

// props.id, props.name, props.price, props.imageUrl
const CollectionItem = ({ item, addItem }) => {
   const { name, price, imageUrl } = item;

   return (
      <div className='collection-item'>
         <div
            className='image'
            style={{
               backgroundImage: `url(${imageUrl})`
            }}
         />
         <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>${price}</span>
         </div>
         <CustomButton onClick={() => addItem(item)} inverted>Add to cart</CustomButton>
      </div>
   )
}

// creates props from the state living in the reducer...
const mapDispatchtoProps = (dispatch) => ({
   // addItem prop is a function that takes the payload item and dispatches the addItem action with the paylaod item...
   addItem: (item) => dispatch(addItem(item)) 
})

export default connect(null, mapDispatchtoProps)(CollectionItem);