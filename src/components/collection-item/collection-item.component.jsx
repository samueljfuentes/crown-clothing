import React from 'react';
import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import { 
   CollectionItemContainer,
   CollectionItemImg,
   CollectionButton,
   CollectionFooter
 } from './collection-item.styles';


const CollectionItem = ({ item, addItem }) => {
   const { name, price, imageUrl } = item;

   return (
      <CollectionItemContainer>
         <CollectionItemImg
            className='image'
            style={{
               backgroundImage: `url(${imageUrl})`
            }}
         />
         <CollectionFooter>
            <span className='name'>{name}</span>
            <span className='price'>${price}</span>
         </CollectionFooter>
         <CollectionButton onClick={() => addItem(item)} inverted>Add to cart</CollectionButton>
      </CollectionItemContainer>
   )
}

// creates props from the state living in the reducer...
const mapDispatchtoProps = (dispatch) => ({
   // addItem prop is a function that takes the payload item and dispatches the addItem action with the paylaod item...
   addItem: (item) => dispatch(addItem(item)) 
})

export default connect(null, mapDispatchtoProps)(CollectionItem);