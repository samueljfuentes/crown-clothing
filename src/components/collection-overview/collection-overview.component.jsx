import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../collection-preview/collection-preview.component';

import { CollectionOverviewContainer } from './collection-overview.styles';

const collectionOverview = ({ collections }) => (
   <CollectionOverviewContainer>
      {
         // destructure id from each collection, and set it as key... all other collection props get set as themselves. ie: title: {title}, etc...
         collections.map(({ id, ...otherCollectionProps }) => {
            return (
               // pass all properties of the collection object (from shopdata) such as id and title as props to the collection preview component...
               <CollectionPreview key={id} {...otherCollectionProps}/>
            )
         })
      }
   </CollectionOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
   collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(collectionOverview);