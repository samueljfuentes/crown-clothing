import React from 'react';
import { connect } from 'react-redux';

import { selectCurrentCollection } from '../../redux/shop/shop.selectors';

// import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => (
   <div className="collection-page">
      <h2>COLLECTION PAGE</h2>
   </div>
);

// ownProps is the 2nd paramater in mapStateToprops, and are the props of the component being wrapped in the connect() function...
// we need this to access the match prop that will automatically be passed in with the Route component...
const mapStateToProps = (state, ownProps) => ({
   // params.collectionId created in the shop component when routing to the collection page...
   // the createSelector inside selectCurrentSeelection returns a function, so we must pass state into it after...
   // this is necessary because the state we are selecting depends on the collectionId param (ie: hats, jackets, etc.)...
   collection: selectCurrentCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);