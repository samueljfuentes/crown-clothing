import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollections } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collection-overview.styles.scss';

const collectionOverview = ({ collections }) => (
   <div className="collection-overview">
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

const mapStateToProps = createStructuredSelector({
   collections: selectCollections
});

export default connect(mapStateToProps)(collectionOverview);