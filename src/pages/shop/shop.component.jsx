import React from 'react';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import SHOP_DATA from './shop.data';

class shopPage extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {
         collections: SHOP_DATA
      };
   };

   render() {

      const {collections} = this.state;

      return (
         <div className='shop-page'>
            {
               // destructure id from each collection, and set it as key... all other collection props get set as themselves. ie: title: {title}, etc...
               collections.map(({ id, ...otherCollectionProps }) => {
                  return (
                     // pass all properties of the collection object (from shopdata) such as id and title as props to the collection preview component...
                     <CollectionPreview key={id} {...otherCollectionProps}/>
                  )
               })
            }
         </div>
      );
   };
}

export default shopPage;