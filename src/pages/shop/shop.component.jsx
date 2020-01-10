import React from 'react';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';


const shopPage = ({ match }) => (
   <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      {/* :categoryId allows us to create the categoryID param in the match object while inside the collection page} */}
      <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
   </div>
);

export default shopPage;